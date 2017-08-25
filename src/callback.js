
const Database = require("./lib/db");
const Logger = require("./lib/logger");
const Sender = require("./lib/sender");

class CallbackHandler {

    constructor (settings) {
        
        this.response = settings.response;

    }

    db () {

        return Database;

    }

    logger (action) {

        return new Logger(action);

    }

    sender () {

        return new Sender(this.response);

    }

}

module.exports = CallbackHandler;