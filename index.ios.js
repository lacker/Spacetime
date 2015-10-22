'use strict';

let Welcome = require('./js/components/welcome');
let DevConsole = require('./js/components/devconsole');
let Login = require('./js/components/login');
let GameRoom = require('./js/components/gameroom');

let React = require('react-native');
let {
  AppRegistry,
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
    switch (this.props.currentView) {
      case "register":
        return (
          <Login store={store} mode='register'></Login>
        );
      case "login":
        return (
          <Login store={store} mode='login'></Login>
        );
      case "play":
        return (
          <GameRoom store={store}></GameRoom>
        );
      case "console":
        return (
          <DevConsole store={store}></DevConsole>
        );
      default:
        return (
          <Welcome store={store}></Welcome>
        );
    } 
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
