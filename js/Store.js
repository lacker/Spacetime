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

let initialState = {log: List()};

function reducer(state = initialState, action) {
  let newState = {...state};

  switch (action.type) {

  case 'heartbeat':
    let log = state.log.push('heartbeat ' + action.id);
    if (log.size > 10) {
      log = log.shift();
    }
    return {...state, log};

  case 'startGame':
    // action contains:
    //   players: a list of the two players in this game
    let players = List(action.players);
    return {
      ...state,
      players,
      turn: action.players[0],
      hand: Map(players.map(p => [p, List()])),
      board: Map(players.map(p => [p, List()])),
      life: Map(players.map(p => [p, 30])),
    };

  case 'drawCard':
    // action contains:
    //   player: the player who's drawing a card
    //   card: the card they're getting. chosen by the server.
    return {
      ...state,
      hand: state.hand.update(
        action.player, hand => hand.push(action.card)),
    };

  case 'play':
    // action contains:
    //   player: the player who's playing a card
    //   cardId: the id of the card they're playing
    let hand = state.hand.get(action.player);
    let [index, card] = state.hand.get(action.player).findEntry(
      c => c.id == action.cardId);
    return {
      ...state,
      hand: state.hand.update(
        action.player, hand => hand.delete(index)),
      board: state.board.update(
        action.player, board => board.push(card)),
    };

  default:
    return state;
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
