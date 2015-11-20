'use strict';

// A MoveDispatcher handles dispatching moves that are made in the game.
// Don't use this for things like navigating through menus - only use
// it when you are making a move via an action that the server should
// also replicate to other players.
class MoveDispatcher {
  // store is the redux store
  // reducer is the reducer that the redux store was created with.
  // socket is a websocket to the server
  constructor(store, reducer, socket) {
    this.store = store;
    this.reducer = reducer;
    this.socket = socket;
  }

  isValid(move) {
    try {
      this.reducer(this.store.getState());
      return true;
    } catch (e) {
      return false;
    }
  }

}

module.exports = MoveDispatcher;
