'use strict';

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
let { fromJS, List, Map } = Immutable;
let redux = require('redux');

let Card = require('./Card');

function reducer(state, action) {
  let newState = {...state};

  switch (action.type) {

  case '@@redux/INIT':
    return {log: List()};

  case 'heartbeat':
    newState.log = state.log.push('heartbeat ' + action.id);
    if (newState.log.size > 10) {
      newState.log = newState.log.shift();
    }
    return newState;

  case 'setView':
    // action contains:
    //  view: a string to use for routing the view
    //  TODO: maybe replace with a better router class
    newState.currentView = action.view;
    return newState;

  case 'seeking':
    newState.seeking = true;
    newState.currentView = 'play';
    return newState;

  case 'register':
    // action contains:
    //  username: a string for the name of the local player
    //  anonymous: a boolean, this is set to true for a guest login
    newState.username = action.username;
    newState.anonymous = action.anonymous;
    return newState;

  case 'startGame':
    // action contains:
    //   players: a list of the two players in this game
    newState.players = List(action.players);
    newState.turn = action.players[0];
    newState.hand = Map(newState.players.map(p => [p, List()]));
    newState.board = Map(newState.players.map(p => [p, List()]));
    newState.life = Map(newState.players.map(p => [p, 30]));

    return newState;

  case 'drawCard':
    // action contains:
    //   player: the player who's drawing a card
    //   card: the card they're getting. chosen by the server.
    newState.hand = state.hand.update(
      action.player, hand => hand.push(action.card));
    return newState;

  case 'play':
    // action contains:
    //   player: the player who's playing a card
    //   cardId: the id of the card they're playing
    let hand = state.hand.get(action.player);
    let [index, card] = state.hand.get(action.player).findEntry(
      c => c.id == action.cardId);
    newState.hand = state.hand.update(
      action.player, hand => hand.delete(index));
    newState.board = state.board.update(
      action.player, board => board.push(card));
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
