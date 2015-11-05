'use strict';

let Immutable = require('immutable');
let { fromJS, List, Map } = Immutable;

// TODO: is a card supposed to be immutable, or mutable? I forgot
// initially that the serialization + deserialization will make the
// card mutable, so some code expects things differently,
// unfortunately.

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

// Turns the data for each card into a card object for a game.
// Specifically, this puts an id on it, and sets health.
let nextId = 1;
function makeCard(data) {
  return data.set('id', nextId++).set('health', data.get('defense'));
}

function random() {
  let data = CARDS.get(Math.floor(Math.random() * CARDS.size));
  return makeCard(data);
}

function withName(name) {
  let data = CARDS.find(c => c.get('name') === name);
  return makeCard(data);
}

module.exports = {
  random,
  withName,
};
