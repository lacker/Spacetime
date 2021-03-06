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

let {Store, reducer} = require('./js/Store');
let store = Store();

let guestName = 'guest' + Math.floor(Math.random() * 1000);

//// Set up websocket

let socket = io('http://localhost:7777', {jsonp: false});

socket.on('connect', () => {
  console.log('connected.');
  store.dispatch({type:'register', player:guestName, anonymous:true});
  let hello = {type: 'hello', player: guestName};
  socket.send(hello);
});

socket.on('disconnect', () => {
  console.log('disconnected.');
});

socket.on('message', message => {
  if (!message.type) {
    console.log('ERROR: no type field in', message);
    return;
  }
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
    let localHand, localBoard, localLife, localMana, remoteBoard, remoteLife, remoteMana;
    if (this.props.hand) {
      localHand = this.props.hand.get(this.props.localPlayer);
      localBoard = this.props.board.get(this.props.localPlayer); 
      localLife = this.props.life.get(this.props.localPlayer); 
      localMana = this.props.mana.get(this.props.localPlayer); 

      remoteBoard = this.props.board.get(this.props.remotePlayer);
      remoteLife = this.props.life.get(this.props.remotePlayer);
      remoteMana = this.props.mana.get(this.props.remotePlayer); 
    }
    switch (this.props.currentView) {
      case "register":
        return (
          <Login anonymous={this.props.anonymous} 
                    player={this.props.localPlayer} 
                    socket={socket} 
                      mode='register'>
          </Login>
        );
      case "login":
        return (
          <Login mode='login'></Login>
        );
      case "play":
        return (
          <GameRoom localPlayer={this.props.localPlayer} 
                   remotePlayer={this.props.remotePlayer} 
                           hand={localHand} 
                    remoteBoard={remoteBoard} 
                     localBoard={localBoard} 
                     remoteLife={remoteLife} 
                      localLife={localLife} 
                     remoteMana={remoteMana} 
                      localMana={localMana} 
                           turn={this.props.turn}
                         socket={socket}>
          </GameRoom>
        );
      case "console":
        return (
          <DevConsole log={this.props.log}></DevConsole>
        );
      default:
        return (
          <Welcome anonymous={this.props.anonymous} 
                      player={this.props.localPlayer} 
                      socket={socket}>
          </Welcome>
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
