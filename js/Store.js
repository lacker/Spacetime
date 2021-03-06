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
//   currentView: a string for what view to show 
//     (console, play, register, welcome)

let Immutable = require('immutable');
let { fromJS, List, Map } = Immutable;
let redux = require('redux');

let Card = require('./Card');

let initialState = {log: List()};

// Applies an effect, defined by a string.
function reduceEffect(state, effect, action) {
  let target = null;
  if (effect.target == Card.TARGETS.SELF_PLAYER) {
    target = action.player;  
  } else if (effect.target == Card.TARGETS.OPPONENT_PLAYER) {
    if (state.localPlayer == action.player) {
      target = state.remotePlayer; 
    } else {
      target = state.localPlayer; 
    }
  }
switch(effect.type) {
  case 'destroyRandom':
    return destroyRandom(state, target);
  case 'damage':
    if (target) {
      return damagePlayer(state, target, effect.amount);
    } else {
      return damagePermanent(state, action.targetId, effect.amount);
    }
  default:
    throw 'unknown effect type: ' + effect.type;
  }
}

// Starts a new turn for the provided player
function beginTurn(state, player) {
  state = {
    ...state,
    turn: player,
    maxMana: state.maxMana.update(player, m => m + 1),
  };
  return {
    ...state,
    mana: state.maxMana
  };
}

function damagePlayer(state, player, amount) {
  state = {
    ...state,
    life: state.life.update(player, m => m - amount),
  };
  return {
    ...state
  };
}


function damagePermanent(state, cardId, amount) {
  return clearDeadCards(updateCard(
    state, cardId,
    card => {
      return {
        ...card,
        health: card.health - amount,
      };
    }));
}

// destroy a random card in target's board
function destroyRandom(state, target) {
  let board = state.board.get(target);
  let card = board.get(Math.floor(Math.random() * board.size));
  if (!card) {
    return state;
  }
  return clearDeadCards(updateCard(
    state, card.id,
    card => {
      return {
        ...card,
        health: 0,
      };
    }));
}

function clearDeadCards(state) {
  return {
    ...state,
    board: state.board.map(cards => cards.filter(c => c.health > 0)),
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

// Applies updater to the card defined by cardId
function updateCard(state, cardId, updater) {    
  return {   
    ...state,    
    board: state.board.map(cards => cards.map(card => {    
      if (card.id === cardId) {    
        return updater(card);    
      } else {   
        return card;   
      }    
    })),   
  };   
}    


let reducers = {
  // action contains:
  //   player: the player who's attacking
  //   cardId: the id of the card that's attacking
  //   targetId: the id of the card that's getting attacked
  attackCard: (state, action) => {
    let damage = state.board.get(action.player).find(
      c => c.id == action.cardId).attack;
    let opponent = state.players.find(p => p !== action.player);
    // TODO: also damage the attacker
    return damagePermanent(state, targetId, damage);
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
  //  localPlayer: a string for the name of the local player
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
    return beginTurn({
      ...state,
      players,
      remotePlayer: players.find(p => p !== state.localPlayer),
      hand: Map(players.map(p => [p, List()])),
      board: Map(players.map(p => [p, List()])),
      life: Map(players.map(p => [p, 30])),
      mana: Map(players.map(p => [p, 0])),
      maxMana: Map(players.map(p => [p, 0])),
    }, action.players[0]);
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
  //   player:   the player who's playing a card
  //   cardId:   the id of the card they're playing
  //   targetId: optional. the id of the card this action is targeting.
  play: (state, action) => {
    let hand = state.hand.get(action.player);
    let entry = hand.findEntry(c => c.id == action.cardId);
    if (!entry) {
      throw Error(action.player + ' does not have cardId ' +
                  action.cardId + ' in their hand');
    }
    let [index, card] = entry;
    let initialMana = state.mana.get(action.player);
    if (card.cost > initialMana) {
      throw Error(card.name + ' requires ' + card.cost + ' mana but ' +
                  action.player + ' only has ' + initialMana);
    }
    let newMana = state.mana.update(
      action.player, mana => mana - card.cost);
    let newHand = state.hand.update(
      action.player, hand => hand.delete(index));
    state = {
      ...state,
      hand: newHand,
      mana: newMana,
    };
    if (card.attack) {
      // Put this card into play
      return {
          ...state,
        board: state.board.update(action.player, board => board.push(card)),
      };
    }
    
    // The card has an effect
    return reduceEffect(state, card.effect, action);
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
    let newPlayer = state.players.find(p => p !== state.turn);
    return beginTurn(state, newPlayer);
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

module.exports = {Store, reducer};
