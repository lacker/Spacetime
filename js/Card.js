'use strict';

let Immutable = require('immutable');
let { fromJS, List, Map } = Immutable;

let CARDS = fromJS([
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
  }, {
    name: 'Bolt',
    effect: {
      type: 'damage',
      amount: 3,
    },
  }]);

// Return a random card. Puts an id on it.
let nextId = 1;
function random() {
  let card = CARDS.get(Math.floor(Math.random() * CARDS.size))
  card = card.set('id', nextId++).set('health', card.get('defense'));
  return CARDS.get(Math.floor(Math.random() * CARDS.size))
}

module.exports = {
  random,
};
