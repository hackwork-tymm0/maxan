
var client = new MaxanClient({ address: '192.168.0.101', port: 1337 });

var response = client.sendAction('clean', { hello: "bitch", maramba: "blabla", const: "hoho" });

console.log(response);