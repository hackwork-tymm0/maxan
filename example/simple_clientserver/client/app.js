
var client = new MaxanClient({ address: '192.168.0.104', port: 1337 });

var response = client.sendAction("test", { load: "high", what: "thefuck" });