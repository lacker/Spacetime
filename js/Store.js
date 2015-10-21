// A Redux store for the local state of the mobile app.
//
// The state has these properties:
//   log: a list of strings. just log messages
//   players: a list of two usernames, for the players in the game.
//   turn: the username of whose turn it is
//   hand: a map from username to a list of their cards. immutable

let Immutable = require('immutable');
let redux = require('redux');

function reducer(state, action) {
  let newState = {...state};

  switch (action.type) {

  case '@@redux/INIT':
    return {log: []};

  case 'heartbeat':
    let log = state.log.concat(['heartbeat ' + action.id]);
    if (log.length > 10) {
      log = log.slice(1);
    }
    newState.log = log;
    return newState;

  case 'startGame':
    newState.players = action.players;
    newState.turn = newState.players[0];
    var hand = {};
    for (var player of newState.players) {
      hand[player] = Immutable.List();
    }
    newState.hand = Immutable.Map(hand);
    return newState;

  default:
    console.log('bad action:', action);
    throw 'bad action type: ' + action.type;
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
