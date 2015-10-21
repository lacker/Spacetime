'use strict';

let SocketIO = require('socket.io');

let Card = require('./Card');

let server = SocketIO(7777);

// Just a set of all open sockets
let sockets = new Set();

// A map from username to their socket.
let socketForUser = new Map();

// A map from username to a list of users in their game.
let games = new Map();

// Either null, or the username of someone who is looking for a game.
// This is the simplest "queue" logic - we just match up the first
// people we get.
let seeking = null;

function send(username, message) {
  let socket = socketForUser.get(username);
  if (socket) {
    socket.send(message);
  }
}

// Sends this message to everyone in this user's game.
function sendToGame(username, message) {
  for (let u of games.get(username)) {
    send(u, message);
  }
}

server.on('connection', socket => {
  sockets.add(socket);
  console.log(`connected! now we have ${sockets.size} clients`);

  socket.on('disconnect', () => {
    if (socket.username) {
      // When you disconnect you are assumed to be no longer looking
      // for a game.
      if (seeking === socket.username) {
        seeking = null;
      }
      socketForUser.delete(socket.username);
    }
    sockets.delete(socket);
    console.log(`disconnected! now we have ${sockets.size} clients`);
  });

  socket.on('message', message => {
    console.log('received:', message);

    switch(message.type) {

    case 'hello':
      // A 'hello' just identifies who a socket is.
      // Since it might happen on reconnect-type problems, it doesn't
      // get any game-specific meaning.
      socket.username = message.username;
      socketForUser.set(message.username, socket);
      break;

    case 'seeking':
      if (seeking === null) {
        // Nobody else is seeking a game, so you have to go into the
        // queue.
        seeking = message.username;
      } else {
        // Start a game
        let players = [seeking, message.username];
        seeking = null;
        for (let player of players) {
          games.set(player, players);
          send(player, {type: 'startGame', players: players});
        }

        // Start the game off by having the players draw cards
        for (let player of players) {
          for (let i = 0; i < 3; i++) {
            sendToGame(player, {
              type: 'drawCard',
              player,
              card: Card.random(),
            });
          }
        }
      }
      break;

    default:
      break;
    }
  });
});

let seconds = 0;
setInterval(() => {
  seconds++;
  sockets.forEach(socket => {
    let message = {type: 'heartbeat', id: seconds};
    console.log('sending:', message);
    socket.send(message);
  });
}, 1000);

console.log('the server is running');
