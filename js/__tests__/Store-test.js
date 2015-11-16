'use strict';

jest.autoMockOff();

let Card = require('../Card');
let Store = require('../Store');

// Applies actions to a new store
function run(actions) {
  let s = Store();
  for (let action of actions) {
    s.dispatch(action);
  }
  return s;
}


describe('Store', () => {
  it('can register', () => {
    let state = run([{
      type: 'register',
      player: 'bob',
      anonymous: false,
    }]);
    let s = state.getState();
    expect(s.localPlayer).toEqual('bob');
  });
  it('can start a game', () => {
    let state = run([{
      type: 'startGame',
      players: ['alice', 'bob'],
    }]);
    let s = state.getState();
    expect(s.turn).toEqual('alice');
    expect(s.hand.size).toEqual(2);
    expect(s.board.size).toEqual(2);
    expect(s.life.size).toEqual(2);
    expect(s.players.size).toEqual(2);
  });

  it('can play through a game', () => {
    let s = run([{
      type: 'startGame',
      players: ['alice', 'bob'],
    }, {
      type: 'drawCard',
      player: 'alice',
      card: Card.withName('Monobot'),
    }, {
      type: 'drawCard',
      player: 'alice',
      card: Card.withName('Monobot'),
    }, {
      type: 'drawCard',
      player: 'bob',
      card: Card.withName('Monobot'),
    }, {
      type: 'drawCard',
      player: 'bob',
      card: Card.withName('Monobot'),
    }]);
    expect(s.getState().hand.get('alice').size).toEqual(2);
    expect(s.getState().hand.get('bob').size).toEqual(2);
    
    s.dispatch({
      type: 'play',
      player: 'alice',
      cardId: 1
    });
    expect(s.getState().hand.get('alice').size).toEqual(1);
    expect(s.getState().hand.get('bob').size).toEqual(2);
    expect(s.getState().mana.get('bob')).toEqual(0);

    s.dispatch({
      type: 'endTurn',
      player: 'alice',
    });
    expect(s.getState().turn).toEqual('bob');
    expect(s.getState().mana.get('bob')).toEqual(1);
    expect(s.getState().maxMana.get('bob')).toEqual(1);

    s.dispatch({
      type: 'endTurn',
      player: 'bob',
    });
    expect(s.getState().turn).toEqual('alice');

    s.dispatch({
      type: 'drawCard',
      player: 'alice',
      card: Card.withName('Bolt'),
    });
    expect(s.getState().hand.get('alice').size).toEqual(2);

    s.dispatch({
      type: 'attackPlayer',
      player: 'alice',
      cardId: 1,
    });
    expect(s.getState().life.get('bob')).toEqual(29);
    expect(s.getState().mana.get('alice')).toEqual(2);

    s.dispatch({
      type: 'play',
      player: 'alice',
      cardId: 5, // the bolt
      targetId: 1, // bolting her own creature
    });
    expect(s.getState().mana.get('alice')).toEqual(1);
  });
});
