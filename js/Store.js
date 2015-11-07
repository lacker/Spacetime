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
//   board: a map from username to a list of cards on the board
//   winner: the username of the winner, if there is one
//   currentView: a string for what view to show (console, play, register, welcome)

let Immutable = require('immutable');
let { fromJS, List, Map } = Immutable;
let redux = require('redux');

let Card = require('./Card');

let initialState = {log: List()};

function clearDeadCards(state) {
  return {
    ...state,
    board: state.board.map(cards => cards.filter(c => c.get('health') > 0)),
  };
}

function checkForWinner(state) {
  let [deadPlayer, _] = state.life.findEntry(total => total <= 0);
  if (!deadPlayer) {
    return state;
  }
  return {
    ...state,
    winner: state.players.find(p => p !== deadPlayer),
  };
}

let reducers = {
  // action contains:
  //   player: the player who's attacking
  //   cardId: the id of the card that's attacking
  //   targetId: the id of the card that's getting attacked
  attackCard: (state, action) => {
    let attack = state.board.get(action.player).find(
      c => c.id == action.cardId).attack;
    let opponent = state.players.find(p => p !== action.player);
    let [index, target] = state.board.get(opponent).findEntry(
      c => c.id == action.targetId);
    return clearDeadCards({
        ...state,
      board: state.board.updateIn(
        [opponent, index, 'health'],
        h => h - attack),
    });
  },

  // action contains:
  //   id: a numerical id sent out as a heartbeat
  heartbeat: (state, action) => {
    let log = state.log.push('heartbeat ' + action.id);
    if (log.size > 10) {
      log = log.shift();
    }
    return {...state, log};
  },

  // action contains:
  //   view: a string to use for routing the view
  //   TODO: maybe replace with a better router class
  setView: (state, action) => {
    return {...state, currentView: action.view};
  },

  // action doesn't have to contain anything.
  seeking: (state, action) => {
    return {
      ...state,
      seeking: true,
      currentView: 'play',
    };
  },

  // action contains:
  //  player: a string for the name of the local player
  //  anonymous: a boolean, this is set to true for a guest login
  register: (state, action) => {
    return {
      ...state,
      localPlayer: action.player,
      anonymous: action.anonymous,
    };
  },

  // action contains:
  //   players: a list of the two players in this game
  startGame: (state, action) => {
    let players = List(action.players);
    return {
      ...state,
      players,
      remotePlayer: players.find(p => p !== state.localPlayer),
      turn: action.players[0],
      hand: Map(players.map(p => [p, List()])),
      board: Map(players.map(p => [p, List()])),
      life: Map(players.map(p => [p, 30])),
    };
  },

  // action contains:
  //   player: the player who's drawing a card
  //   card: the card they're getting. chosen by the server.
  drawCard: (state, action) => {
    return {
      ...state,
      hand: state.hand.update(
        action.player, hand => hand.push(action.card)),
    };
  },

  // action contains:
  //   player: the player who's playing a card
  //   cardId: the id of the card they're playing
  play: (state, action) => {
    let hand = state.hand.get(action.player);
    let card = hand.find(
      c => c.id == action.cardId);
    let index = hand.indexOf(card)
    let newState = {
      ...state,
      board: state.board.update(
        action.player, board => board.push(card)),
      hand: state.hand.update(
        action.player, hand => hand.delete(index)),
    };
    return newState;
  },

  // action contains:
  //   player: the player who's attacking
  //   cardId: the id of the card that's attacking
  attackPlayer: (state, action) => {
    let attack = state.board.get(action.player).find(
      c => c.id == action.cardId).attack;
    let opponent = state.players.find(p => p !== action.player);
    return {
      ...state,
      life: state.life.update(
        opponent, val => val - attack),
    };
  },

  // action contains:
  //   player: the player whose turn is ending
  endTurn: (state, action) => {
    return {
      ...state,
      turn: state.players.find(p => p !== state.turn),
    };
  },

};

function reducer(state = initialState, action) {
  let f = reducers[action.type];
  if (f) {
    return f(state, action);
  } else {
    return state;
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
