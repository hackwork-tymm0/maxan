
const Express = require("express");
const Logger = require("tymlogger");
const IP = require("ip");
const CallbackHandler = require("./callback");
const Actions = require("./actions");

const logger = new Logger();
let app = null;
let list = {
    actions: []
};

let defaultSettings = {
    port: 1337
};

class Handle {

    constructor (settings) {

        this.port = settings.port || defaultSettings.port;

    }

    __getActionsMethod (req, res) {

        logger.write(req.client.remoteAddress.split(":")[3] + " get actions.");

        res.set("Content-Type", "text/plain");
        res.set("Access-Control-Allow-Origin", null);
        res.send(JSON.stringify(list));

    }

    start () {

        app = Express();
        
        app.get("/getActions", this.__getActionsMethod);

        logger.write("Server starting...");

    }

    addRouteName (name) {

        list.actions.push(name);

    }

    addRoute (action) {

        app.get("/action/" + action.actionName, (req, res) => {

            const handler = new CallbackHandler({ response: res });
            
            action.handler(handler.db(), handler.logger(action.actionName), handler.sender());

        });

        logger.write("Added route: /action/" + action.actionName);

    }

    routesAdded () {

        app.listen(this.port, () => {

            logger.success("Server started at http://" + IP.address() + ":" + this.port + "!");

        });

    }

}

module.exports = Handle;
