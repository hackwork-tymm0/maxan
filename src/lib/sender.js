
const _ = require("lodash");
const path = require("path");
const Logger = require("tymlogger");
const FileExists = require("file-exists");

const logger = new Logger();

class Sender {

    constructor (res) {

        this.res = res;

    }

    send (json = "") {

        if (json === "") {

            log.error("Sender::send() - argument is undefined");
            process.exit();

        }

        if (typeof json == "object") {
            
            if (_.isEmpty(json) == false) {

                this.res.set("Content-Type", "text/plain");
                this.res.set("Access-Control-Allow-Origin", null);
                this.res.send(JSON.stringify(json));

            } else {

                logger.error("Your data is empty!");
                throw new Error("Your data is empty!")
                process.exit();

            }

        } else {

            logger.error("Your data is not object! Data: " + json);
            throw new Error("Your data is not object! Data: " + json);
            process.exit();

        }

    }

    sendFile (filename = "") {

        if (filename == "") {
            
            logger.error("Sender::sendFile() - filename is undefined");

        }

        if (FileExists.sync(filename)) {

            this.res.set("Content-Type", "text/plain");
            this.res.set("Access-Control-Allow-Origin", null);
            this.res.sendFile(filename);

        } else {

            logger.error("File " + filename + " not exists.");

        }        

    }

}

module.exports = Sender;
