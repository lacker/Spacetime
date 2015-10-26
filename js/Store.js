// A Redux store for the local state of the mobile app.
let redux = require('redux');


function reducer(state, action) {
  let newState = {...state};

  switch (action.type) {

  case '@@redux/INIT':
    return {log: []};

  case 'heartbeat':
    let log = state.log.concat(['heartbeat ' + action.id]);
    if (log.length > 10) {
      log = log.slice(1);
    }
    newState.log = log;
    return newState;

  case 'setView':
    newState.currentView = action.view;
    return newState;

  case 'seeking':
    newState.seeking = true;
    newState.currentView = 'play';
    return newState;

  case 'register':
    newState.username = action.username;
    return newState;

  case 'startGame':
    newState.players = action.players;
    console.log("GAME START")
    return newState;

  default:
    console.log('bad action:', action);
    throw 'bad action type: ' + action.type;
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
