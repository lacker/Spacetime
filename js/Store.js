// A Redux store for the local state of the mobile app.
//
// The root state object is not immutable because redux discourages
// that, but each child is immutable. It has these properties:
//   log: a list of strings. just log messages
//   players: a list of two usernames, for the players in the game.
//   turn: the username of whose turn it is
//   life: a map from username to how much life they have.
//   hand: a map from username to a list of their cards.

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
    // action contains:
    //   players: a list of the two players in this game
    newState.players = List(action.players);
    newState.turn = action.players[0];
    newState.hand = Map(newState.players.map(p => [p, List()]));
    newState.life = Map(newState.players.map(p => [p, 30]));

    return newState;

  case 'draw':
    // action contains:
    //   player: the player who's drawing a card
    //   card: the card they're getting. chosen by the server.
    newState.hand = state.hand.update(
      action.player, hand => hand.push(action.card));
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
