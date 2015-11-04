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

function opponent(player) {
  for (let u of games.get(player)) {
    if (u !== player) {
      return u;
    }
  }

  throw 'Control should never get here';
}

function send(player, message) {
  let socket = socketForUser.get(player);
  console.log("send to " + socket)
  if (socket) {
    socket.send(message);
  }
}

// Sends this message to everyone in this user's game.
function sendToGame(player, message) {
  for (let u of games.get(player)) {
    send(u, message);
  }
}

// Sends this message only to the opponent.
function sendToOpponent(message) {
  console.log("sending to " + opponent(message.player))
  console.log(message)
  send(opponent(message.player), message);
}

server.on('connection', socket => {
  sockets.add(socket);
  console.log(`connected! now we have ${sockets.size} clients`);

  socket.on('disconnect', () => {
    if (socket.player) {
      // When you disconnect you are assumed to be no longer looking
      // for a game.
      if (seeking === socket.player) {
        seeking = false;
      }
      socketForUser.delete(socket.player);
    }
    sockets.delete(socket);
    console.log(`disconnected! now we have ${sockets.size} clients`);
  });

  socket.on('message', message => {
    if (message.type != 'heartbeat') {
      console.log('received:', message);
    }
    switch(message.type) {

    case 'hello':
      // A 'hello' just identifies who a socket is.
      // Since it might happen on reconnect-type problems, it doesn't
      // get any game-specific meaning.
      socket.player = message.player;
      socketForUser.set(message.player, socket);
      break;

    case 'seeking':
      if (!seeking) {
        // Nobody else is seeking a game, so you have to go into the
        // queue.
        seeking = message.player;
      } else {
        // Start a game
        let players = [seeking, message.player];
        seeking = false;
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

    case 'endTurn':
      sendToOpponent(message);

      // After each turn, we give the other player a card.
      let response = {
        player: opponent(message.player),
        card: Card.random(),
      };
      sendToGame(message.player, response);
      break;

    case 'play':
      sendToOpponent(message);
      break;

    default:
      console.log('unhandled message', message);
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
