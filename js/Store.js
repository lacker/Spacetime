// A Redux store for the local state of the mobile app.
let redux = require('redux');


function reducer(state, action) {
  switch (action.type) {

  case '@@redux/INIT':
    return {log: []};

  case 'message':
    let log = state.log.concat([action.message]);
    if (log.length > 10) {
      log = log.slice(1);
    }
    let answer = {...state};
    answer.log = log;
    return answer;

  default:
    console.log('bad action:', action);
    throw 'bad action type: ' + action.type;
  }
}

let Store = () => {
  return redux.createStore(reducer);
};

module.exports = Store;
