'use strict';

let Welcome = require('./js/components/Welcome');
let DevConsole = require('./js/components/DevConsole');
let Login = require('./js/components/Login');
let GameRoom = require('./js/components/GameRoom');

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
  store.dispatch({type:'register', username:guestName, anonymous:true});
  let hello = {type: 'hello', username: guestName};
  socket.send(hello);
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
          <Login anonymous={this.props.anonymous} username={this.props.username} socket={socket} mode='register'></Login>
        );
      case "login":
        return (
          <Login mode='login'></Login>
        );
      case "play":
        return (
          <GameRoom players={this.props.players}></GameRoom>
        );
      case "console":
        return (
          <DevConsole></DevConsole>
        );
      default:
        return (
          <Welcome anonymous={this.props.anonymous} username={this.props.username} socket={socket}></Welcome>
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
