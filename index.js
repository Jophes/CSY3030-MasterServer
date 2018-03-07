const net = require('net');

var serverList = [];
/*
function Address(_ip, _port) {
    var self = this;
    this.ip = _ip;
    this.port = _port;

    self.exportStr = null;
    this.export = {
        get: function() {
            if (self.exportStr == null) {
                self.exportStr = JSON.stringify({ip: self.ip, port: self.port});
            }
            return self.exportStr;
        }
    }
}

function ServerData(address) {
    var self = this;

    this.remote = address;
}*/

function randomIP() {
    var str = Math.floor(Math.random() * 256).toString();
    for (let i = 0; i < 3; i++) {
        str = str + '.' + Math.floor(Math.random() * 256);
    }
    return str;
}

for (let i = 0; i < 81920; i++) {
    serverList.push({ip: randomIP(), port: Math.floor(1024 + Math.random() * 8192)});
}

var listener = net.createServer(function(socket) {
    console.log('Connection made');

    socket.on('finish', function() {
        console.log('Finish')
    });
    socket.on('end', function() {
        console.log('End');
    });
    
    socket.write(JSON.stringify(serverList));
});

listener.listen(36200);