'use strict';

let WebSocketServer = require('ws').Server;
let server = new WebSocketServer({ port: 7777 });

let sockets = new Set();

server.on('connection', socket => {
  sockets.add(socket);

  socket.on('message', message => {
    console.log('received: %s', message);
  });

  socket.on('close', () => {
    sockets.delete(socket);
  });
});

let seconds = 0;
setInterval(() => {
  seconds++;
  sockets.forEach(socket => {
    socket.send(`this server has been alive for ${seconds} seconds`);
  });
}, 1000);

console.log('the server is running');
