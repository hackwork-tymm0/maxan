
const path = require("path");
const Logger = require("tymlogger");
const Actions = require("./Actions");
const Handle = require("./handle");

const pjson = require("../package.json");
const logger = new Logger();

const defaultSettings = {
    port: 1337
};

class Maxan {

    constructor (settings = defaultSettings) {
        
        logger.write("");
        logger.success("  Maxan v" + pjson.version + " starts.");
        logger.write("");

        logger.write("Server init...");

        this.dbDir = settings.databaseFile || defaultSettings.databaseFile;
        this.port = settings.port || defaultSettings.port;

        logger.success("Server initialized.");

    }

    action (actionName, callback) {

        let actions = new Actions();

        actions.add(actionName, callback);

    }

    start () {

        let actions = new Actions();
        let list = actions.getActions();
        
        let handle = new Handle({ port: this.port });

        handle.start();

        if (list.length == 0) {

            logger.error("No actions added!");
            process.exit();

        } else {

            for (var i = 0; i < list.length; i++) {

                handle.addRoute(list[i]);

            }

            handle.routesAdded();

        }

    }

}

module.exports = Maxan
