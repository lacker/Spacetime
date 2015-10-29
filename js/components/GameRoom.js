'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');

let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let GameBoard = require('./GameBoard');
let PlayerAvatar = require('./PlayerAvatar');

let GameRoom = connect()(React.createClass({
  render: function() {
    let welcomeString = 'Fight!';
    if (!this.props.players || 
        this.props.players.length < 2) {
      welcomeString = 'Waiting for Opponent';
    }

    let localUsername = '';
    let remoteUsername = '';
    if (this.props.players) {
      localUsername = this.props.username;
      for (let username of this.props.players) {
        if (username != localUsername) {
          remoteUsername = username;
        }
      }
    }
    return (
      <View>
        <Text style={globalStyles.header}>
          {welcomeString}
        </Text>
        <PlayerAvatar type='remotePlayer' username={remoteUsername}></PlayerAvatar>
        <GameBoard></GameBoard>
        <PlayerAvatar type='localPlayer' username={localUsername}></PlayerAvatar>

        <View style={globalStyles.buttonContainer}>
          <Button onPress={() => {
              this.props.dispatch({type:'setView', view:'welcome'});
            }}>
            Resign
          </Button>
        </View>
      </View>
    );
  }
}));

module.exports = GameRoom;
