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
  }]);

// Return a random card. Puts an id on it.
let nextId = 1;
function random() {
  return CARDS.get(Math.floor(Math.random() * CARDS.size)).set('id', nextId++);
}

module.exports = {
  random,
};