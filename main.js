var server = require('./modules/server2.js');

const fs = require('fs');
let data = JSON.parse(fs.readFileSync('data.json'));

//initialize the server
server.ini_server(data["local"]);
