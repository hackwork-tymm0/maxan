
const Log = require("tymlogger");

const logger = new Log();

class Logger {

    constructor (action) {

        this.action = action;

    }

    write (text = "") {

        logger.write(this.action + " => " + text);

    }
    
    success (text = "") {

        logger.success(this.action + " => " + text);

    }
    
    error (text = "") {

        logger.error(this.action + " => " + text);

    }

}

module.exports = Logger;
