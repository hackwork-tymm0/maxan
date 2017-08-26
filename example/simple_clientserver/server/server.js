
const Maxan = require("../../../src/main");
const path = require("path");

const server = new Maxan();

let users = [];

server.action("addUser", (lib) => {

    users[lib.Params.user] = 0;
    lib.Logger.write(lib.Params.user + " added");

    lib.Sender.send({ success: true });

});

server.action("getUsers", (lib) => {

    lib.Sender.send(users);

});

server.action("addCount", (lib) => {



});

server.start();