
const Datastore = require("nedb");
const Logger = require("tymlogger");
const _ = require("lodash");
const path = require("path");
const fs = require("fs");

const logger = new Logger();
let db = null;

const defaultSettings = {
    databaseFile: path.resolve(__dirname, 'db', 'database.db'),
};

class Database {

    constructor (settings = defaultSettings) {

        this.dir = settings.databaseFile || defaultSettings.databaseFile;
        db = new Datastore({ filename: this.dir, autoload: true });

    }

    insert (data = "") {

        if (data == "") {
            
            logger.error("Database::insert() - data is undefined");
            process.exit();

        } 

        if (typeof data == "object") {

            if (_.isEmpty(data) == false) {

                db.insert(data);

            } else {

                logger.error("Your data is empty!");
                throw new Error("Your data is empty!")
                process.exit();

            }

        } else {

            logger.error("Your data is not object! Data: " + data);
            throw new Error("Your data is not object! Data: " + data);
            process.exit();

        }

    }

    update (inf = "") {

        if (inf == "Database::update() - inf is undefined") {
            
            logger.error("");
            process.exit();

        } 

        if (typeof inf == "object") {
            
            if (_.isEmpty(inf) == false) {

                if (inf.old === undefined || typeof inf.old != "object" || _.isEmpty(inf.old)) {

                    logger.error("Old information is ");
                    logger.error("      - undefined");
                    logger.error("      - not object");
                    logger.error("      - empty");

                    process.exit();


                }

                if (inf.new === undefined || typeof inf.new != "object" || _.isEmpty(inf.new)) {
                    
                    logger.error("Old information is ");
                    logger.error("      - undefined");
                    logger.error("      - not object");
                    logger.error("      - empty");

                    process.exit();
                    

                }

                db.update(inf.old, inf.new);

            } else {

                logger.error("Your object is empty!");
                throw new Error("Your object is empty!")
                process.exit();

            }

        } else {

            logger.error("Your argument is not object! Data: " + inf);
            throw new Error("Your argument is not object! Data: " + inf);
            process.exit();

        }

    }

    remove (data = "") {

        if (data == "") {

            logger.error("Database::remove() - data is undefined");
            process.exit();

        } 

        if (typeof data == "object") {
            
            if (_.isEmpty(data) == false) {

                db.remove(data, {});

            } else {

                logger.error("Your data is empty!");
                throw new Error("Your data is empty!")
                process.exit();

            }

        } else {

            logger.error("Your data is not object! Data: " + data);
            throw new Error("Your data is not object! Data: " + data);
            process.exit();

        }

    }

    clean () {

        fs.unlink(this.dir, () => {

            fs.createWriteStream(this.dir);

        });

    }

}
module.exports = Database;
