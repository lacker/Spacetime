'use strict';

let server = require('socket.io')(7777);

let sockets = new Set();

server.on('connection', socket => {
  sockets.add(socket);
  console.log(`connected! now we have ${sockets.size} clients`);

  socket.on('disconnect', () => {
    sockets.delete(socket);
    console.log(`disconnected! now we have ${sockets.size} clients`);
  });

  socket.on('message', message => {
    console.log('received:', message);
  });
});

let seconds = 0;
setInterval(() => {
  seconds++;
  sockets.forEach(socket => {
    let message = `hello ${seconds}`;
    console.log('sending:', message);
    socket.send(message);
  });
}, 1000);

console.log('the server is running');
