// A Redux store for the local state of the mobile app.
let redux = require('redux');

function reducer(state = [], action) {
  switch (action.type) {
  case 'message':
    return state.concat([action.message]);
  default:
    console.log('bad action:', action);
    return [];
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
