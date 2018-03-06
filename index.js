const net = require('net');

var serverList = [];

function Address(_ip, _port) {
    var self = this;
    this.ip = _ip;
    this.port = _port;
}

function ServerData(address) {
    var self = this;

    this.remote = address;
}

const { execFile } = require('child_process');
const child = execFile('node', ['child.js'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

function randomIP() {
    var str = Math.floor(Math.random() * 256).toString();
    for (let i = 0; i < 3; i++) {
        str = str + '.' + Math.floor(Math.random() * 256);
    }
    return str;
}

for (let i = 0; i < 8192; i++) {
    serverList.push(new ServerData(new Address(randomIP(), 1024 + Math.random() * 8192)));
}

var listener = net.createServer(function(socket) {
    /*console.log('Connection made');
    console.log(socket);*/
    
    socket.on('finish', function() {
        console.log('Finish')
    });
    socket.on('end', function() {
        console.log('End');
    });
});

listener.listen(36200);