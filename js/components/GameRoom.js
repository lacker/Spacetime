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
let HandOfCards = require('./HandOfCards');

let GameRoom = connect()(React.createClass({
  render: function() {
    this.seatPlayers();
    return (
      <View style={roomStyles.roomContainer}>
        <View style={roomStyles.gameArea}>
 
          <HandOfCards type='remotePlayer'></HandOfCards>

          <View style={roomStyles.playerArea}>
            <PlayerAvatar type='remotePlayer' username={this.remoteUsername}></PlayerAvatar>
          </View>
 
          <GameBoard style={roomStyles.gameBoard}></GameBoard>
 
          <View style={[roomStyles.playerArea, globalStyles.buttonContainer]}>
            <PlayerAvatar type='localPlayer' username={this.localUsername}></PlayerAvatar>
          </View>

          <HandOfCards type='localPlayer'></HandOfCards>

 
        </View>

        <View style={roomStyles.rightButtonArea}>
            <Button onPress={() => {
              this.props.dispatch({type:'setView', view:'welcome'});
              }}>
              Resign
            </Button>
        </View>
      </View>
  );
  },

  seatPlayers: function () {
    this.localUsername = this.props.username;
    this.remoteUsername = 'Waiting for Opponent';
    if (this.props.players) {
      for (let username of this.props.players) {
        if (username != this.localUsername) {
          this.remoteUsername = username;
        }
      }
    }

  }
}));

let roomStyles = StyleSheet.create({
  roomContainer: {
    flex:1,
    backgroundColor:'yellow',
    flexDirection: 'row',
  },
  gameArea: {
    flex:1,
    backgroundColor:'red',
  },
  playerArea: {
    flex:0,
    backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonArea : {
    width: 80,
    justifyContent: 'center',
  }
});


module.exports = GameRoom;
