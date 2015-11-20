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
    cost: 1,
  }, {
    name: 'Bibot',
    attack: 2,
    defense: 2,
    cost: 2,
  }, {
    name: 'Tribot',
    attack: 3,
    defense: 3,
    cost: 3,
  }, {
    name: 'Bolt',
    effect: {
      type: 'damage',
      amount: 3,
    },
    cost: 1,
  }]);

// Turns the data for each card into a card object for a game.
// Specifically, this puts an id on it, and sets health.
let nextId = 1;
function makeCard(data) {
  let cardText = makeText(data.get('effect'));
  return data.set('text', cardText).set('id', nextId++).set('health', data.get('defense'));
}

// return human readable text for the effect of a card
function makeText(effect) {
  if (effect && effect.get('type') == 'damage') {
    return "Deal " + effect.get('amount') + " damage."
  }
  return "";
}

function random() {
  let data = CARDS.get(Math.floor(Math.random() * CARDS.size));
  return makeCard(data);
}

// The tests work with this returning JSON but it may not be ideal.
// TODO: figure out whether this should really return JSON, or whether
// it should return an immutable map.
function withName(name) {
  let data = CARDS.find(c => c.get('name') === name);
  return makeCard(data).toJSON();
}

module.exports = {
  random,
  withName,
};
