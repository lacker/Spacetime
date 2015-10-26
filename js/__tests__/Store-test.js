'use strict';

jest.autoMockOff();

let Store = require('../Store');

// Applies actions to a new store
function run(actions) {
  let s = Store();
  for (let action of actions) {
    s.dispatch(action);
  }
  return s.getState();
}

let bot = {
  name: 'Bot',
  attack: 1,
  defense: 1,
};

describe('Store', () => {
  it('can start a game', () => {
    let s = run([{
      type: 'startGame',
      players: ['alice', 'bob'],
    }]);
    expect(s.turn).toEqual('alice');
    expect(s.hand.size).toEqual(2);
    expect(s.board.size).toEqual(2);
    expect(s.life.size).toEqual(2);
    expect(s.players.size).toEqual(2);
  });

  it('can draw and play cards', () => {
    let s = run([{
      type: 'startGame',
      players: ['alice', 'bob'],
    }, {
      type: 'drawCard',
      player: 'alice',
      card: bot,
    }, {
      type: 'drawCard',
      player: 'alice',
      card: bot,
    }, {
      type: 'drawCard',
      player: 'bob',
      card: bot,
    }, {
      type: 'drawCard',
      player: 'bob',
      card: bot,
    }]);
    expect(s.hand.get('alice').size).toEqual(2);
    expect(s.hand.get('bob').size).toEqual(2);
  });
});
