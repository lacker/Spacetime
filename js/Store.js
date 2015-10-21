// A Redux store for the local state of the mobile app.
//
// The state has these properties:
//   log: a list of strings. just log messages
//   players: a list of two usernames, for the players in the game.
//   turn: the username of whose turn it is
//   life: a map from username to how much life they have. immutable
//   hand: a map from username to a list of their cards. immutable

let Immutable = require('immutable');
let { List, Map } = Immutable;
let redux = require('redux');

const CARDS = [
  {
    name: 'Monobot',
    attack: 1,
    defense: 1,
  }, {
    name: 'Bibot',
    attack: 2,
    defense: 2,
  }, {
    name: 'Tribot',
    attack: 3,
    defense: 3,
  }];

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
    newState.hand = Map(newState.players.map(p => { return [p, List()]; }));
    newState.life = Map(newState.players.map(p => { return [p, 30]; }));

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
