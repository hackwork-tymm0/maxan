
const Maxan = require("../../../src/main");
const path = require("path");

const server = new Maxan();

server.action("test", (lib) => {

    lib.Logger.write(JSON.stringify(lib.Params));

    lib.Sender.send({ success: true });

});

server.start();