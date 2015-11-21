'use strict';

jest.autoMockOff();

let {Store, reducer} = require('../Store');
let MoveDispatcher = require('../MoveDispatcher');

describe('MoveDispatcher', () => {
  it('can be created', () => {
    let store = Store();
    let socket = null;
    let dispatcher = new MoveDispatcher(store, reducer, socket);
  });
});

