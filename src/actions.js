
const Logger = require("tymlogger");
const Handle = require("./handle");

const logger = new Logger();
let listActions = [];

class Actions {

    add (actionName, handler) {

        if (listActions.length == 0) {

            listActions.push({ actionName, handler });
            logger.write("Action added: " + actionName);

        } else {

            for (var i = 0; i < listActions.length; i++) {
                
                if (listActions[i].actionName == actionName) {
    
                    logger.error("Your action name is not unique!");
                    process.exit();
    
                }
            
            }

            listActions.push({ actionName, handler });
            logger.write("Action added: " + actionName);

        }

    }

    getActions () {
        
        return listActions;

    }

}

module.exports = Actions
