// A Redux store for the local state of the mobile app.
let redux = require('redux');

function reducer(state, action) {
  switch (action.type) {
  case 'message':
    let oldlog = state.log || [];
    let log = oldlog.concat([action.message]);
    if (log.length > 10) {
      log = log.slice(1);
    }
    return {log};
  default:
    console.log('bad action:', action);
    return {};
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
