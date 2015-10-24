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
});
