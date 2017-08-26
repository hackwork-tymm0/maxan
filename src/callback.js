
const Database = require("./lib/db");
const Logger = require("./lib/logger");
const Sender = require("./lib/sender");

class CallbackHandler {

    constructor (settings) {
        
        this.request = settings.request;
        this.response = settings.response;

    }

    db () {

        return Database;

    }

    logger (action) {

        return new Logger(action);

    }

    sender () {

        return new Sender(this.request, this.response);

    }

    params () {

        return new Sender(this.request, this.response).getParams();

    }

}

module.exports = CallbackHandler;