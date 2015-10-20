'use strict';

let Welcome = require('./js/components/welcome');

let React = require('react-native');
let {
  AppRegistry,
  View
} = React;
let { connect } = require('react-redux');
let { Provider } = require('react-redux/native')

// userAgent should be set before importing socket.io
window.navigator.userAgent = 'react-native';
let io = require('socket.io-client/socket.io');

let Store = require('./js/Store');
let store = Store();

let guestName = 'guest' + Math.floor(Math.random() * 1000);


//// Set up websocket

let socket = io('http://localhost:7777', {jsonp: false});

socket.on('connect', () => {
  console.log('connected.');

  let hello = {type: 'hello', username: guestName};
  let seeking = {type: 'seeking', username: guestName};
  socket.send(hello);
  socket.send(seeking);
});

socket.on('disconnect', () => {
  console.log('disconnected.');
});

socket.on('message', message => {
  store.dispatch(message);
  console.log('received:', message);
});


//// Set up the view

// Just pipe all the redux state through as props
function select(state) {
  return state;
}

let App = connect(select)(React.createClass({
  render: function() {
    return (
      <Welcome>
      </Welcome>
    );
  }
}));

// This is redux boilerplate
let Spacetime = React.createClass({
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
});

AppRegistry.registerComponent('Spacetime', () => Spacetime);
