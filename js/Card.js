'use strict';

let Immutable = require('immutable');
let { fromJS, List, Map } = Immutable;

// Possible values for target property
let TARGETS = {
    ALL_PERMANENTS      : -1,
    ANY_PERMANENT       : 0,
    ANY_PLAYER          : 1,
    ANY_ANY             : 2,
    OPPONENT_PLAYER     : 3,
    OPPONENT_PERMANENT  : 4,
    OPPONENT_ANY        : 5,
    SELF_PLAYER         : 6,
    SELF_PERMANENT      : 7,
    SELF_ANY            : 8,
}

// TODO: is a card supposed to be immutable, or mutable? I forgot
// initially that the serialization + deserialization will make the
// card mutable, so some code expects things differently,
// unfortunately.

let CARDS = fromJS([
  {
    name: 'Snake',
    type: 'permanent',
    attack: 1,
    defense: 1,
    cost: 1,
  }, {
    name: 'Bear',
    type: 'permanent',
    attack: 2,
    defense: 2,
    cost: 2,
  }, {
    name: 'Tiger',
    type: 'permanent',
    attack: 3,
    defense: 3,
    cost: 3,
  }, {
    name: 'Zap',
    type: 'effect',
    effect: {
      type: 'damage',
      amount: 3,
      target: TARGETS.ANY_ANY,
    },
    cost: 1,
  }, {
    name: 'Bash',
    type: 'effect',
    effect: {
      type: 'damage',
      amount: 5,
      target: TARGETS.OPPONENT_PLAYER,
    },
    cost: 1,
  }, {
    name: 'Wildfire',
    type: 'effect',
    effect: {
      type: 'destroyRandom',
      target: TARGETS.OPPONENT_PLAYER,
    },
    cost: 1,
  }, {
    name: 'Banish',
    type: 'effect',
    effect: {
      type: 'destroy',
      target: TARGETS.ANY_PERMANENT,
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
  let text = ""
  if (!effect) {
    return text;
  }
  if (effect.get('type') == 'damage') {
    text = "Deal " + effect.get('amount') + " damage to";
    text += makeTargetText(effect);
  }
  if (effect.get('type') == 'destroy') {
    text = "Destroy";
    text += makeTargetText(effect);
  }
  if (effect.get('type') == 'destroyRandom') {
    text = "Destroy one random permanent from";
    text += makeTargetText(effect);
  }
  return text;
}

// return human readable text for part of a sentence
// based on what the targets are for the effect of a card
function makeTargetText(effect) {
  if (effect.get('target') == TARGETS.ANY_ANY) {
    return " any target.";
  }
  if (effect.get('target') == TARGETS.ANY_PERMANENT) {
    return " any permanent.";
  }
  if (effect.get('target') == TARGETS.SELF_PLAYER) {
    return " you.";
  }
  if (effect.get('target') == TARGETS.OPPONENT_PLAYER) {
    return " an opponent.";
  }
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
  TARGETS,
  random,
  withName,
};
