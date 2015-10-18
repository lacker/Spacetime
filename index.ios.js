'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// userAgent should be set before importing socket.io
window.navigator.userAgent = 'react-native';
let io = require('socket.io-client/socket.io');

let socket = io('http://localhost:7777', {jsonp: false});

let guestName = 'guest' + Math.floor(Math.random() * 1000);

socket.on('connect', () => {
  let message = `hello from ${guestName} in iOS land`;
  console.log('connected. sending', message);
  socket.send(message);
});

socket.on('disconnect', () => {
  console.log('disconnected.');
});

socket.on('message', message => {
  console.log('received:', message);
});

let Spacetime = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Spacetime! You are {guestName}.
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Spacetime', () => Spacetime);
