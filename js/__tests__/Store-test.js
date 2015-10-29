'use strict';

jest.autoMockOff();

let Store = require('../Store');

// Applies actions to a new store
function run(actions) {
  let s = Store();
  for (let action of actions) {
    s.dispatch(action);
  }
  return s;
}

function bot(id) {
  return {
    name: 'Bot',
    attack: 1,
    defense: 1,
    id
  };
}

describe('Store', () => {
  it('can register', () => {
    let state = run([{
      type: 'register',
      username: 'bob',
      anonymous: false,
    }]);
    let s = state.getState();
    expect(s.username).toEqual('bob');
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

  it('can draw, play cards, end turn', () => {
    let s = run([{
      type: 'startGame',
      players: ['alice', 'bob'],
    }, {
      type: 'drawCard',
      player: 'alice',
      card: bot(1),
    }, {
      type: 'drawCard',
      player: 'alice',
      card: bot(2),
    }, {
      type: 'drawCard',
      player: 'bob',
      card: bot(3),
    }, {
      type: 'drawCard',
      player: 'bob',
      card: bot(4),
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

    s.dispatch({
      type: 'endTurn',
      player: 'alice',
    });
    expect(s.getState().turn).toEqual('bob');
  });
});
