
const Maxan = require("../../../src/main");
const path = require("path");

const server = new Maxan({port: 1337});

server.action("set", (db, logger, sender) => {

    let database = new db({databaseFile: path.resolve(__dirname, 'db', 'maxan.db')});

    database.insert({id: 1, data: "i'm"});

    sender.sendFile(path.resolve(__dirname, 'db', 'maxan.db'));

    logger.write("data setted");

});

server.action("get", (db, logger, sender) => {

    let database = new db({databaseFile: path.resolve(__dirname, 'db', 'maxan.db')});

    database.update({old: {id: 1} , new: { id: 1, data: "me" } });

    sender.send({success: true});

    logger.write("data updated");

});

server.action("clean", (db, logger, sender) => {

    let database = new db({databaseFile: path.resolve(__dirname, 'db', 'maxan.db')});

    database.clean();

    sender.send({ success: true });

    logger.write("database cleaned");

});

server.action("what", (db, logger, sender) => {

    const database = new db({databaseFile: path.resolve(__dirname, 'db', 'thefuck.db')});
    database.insert({ oh: "doge" });

});

server.start();
