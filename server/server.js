var http = require('http');
var ns = require('node-static');

var file = new ns.Server('../client/');
var server = http.createServer(function(req, resp) {
    req.on('end', function() {
        file.serve(req, resp);
    });
});
server.listen(8080);

var nowjs = require('now');
var everyone = nowjs.initialize(server);

everyone.now.joinRoom = function(name, callback) {
    var room = nowjs.getGroup('room-' + name);
    room.addUser(this.user.clientId);
    callback();
}

everyone.now.leaveRoom = function(name, callback) {
    var room = nowjs.getGroup('room-' + name);
    room.removeUser(this.user.clientId);
    callback();
}

everyone.now.distributeMessage = function(room, message) {
    var roomGroup = nowjs.getGroup('room-' + room);
    roomGroup.now.recvMessage(room, this.now.nick, message);
}
