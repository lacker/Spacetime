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
let BoardOfCards = require('./BoardOfCards');

let GameRoom = connect()(React.createClass({
  render: function() {
    
    return (
      <View style={roomStyles.roomContainer}>
        
        <View style={roomStyles.gameArea}>
 
          <HandOfCards type='remotePlayer'></HandOfCards>

          <View style={roomStyles.playerArea}>
            <PlayerAvatar type='remotePlayer' player={this.props.remotePlayer}></PlayerAvatar>
          </View>
 
          <GameBoard style={roomStyles.gameBoard}>
            <BoardOfCards type='remotePlayer' cards={this.props.remoteBoard} player={this.props.remotePlayer}></BoardOfCards>
            <BoardOfCards type='localPlayer' cards={this.props.localBoard} player={this.props.localPlayer}></BoardOfCards>
          </GameBoard>
 
          <View style={[roomStyles.playerArea, globalStyles.buttonContainer]}>
            <PlayerAvatar type='localPlayer' player={this.props.localPlayer}></PlayerAvatar>
          </View>

          <HandOfCards type='localPlayer' cards={this.props.hand} player={this.props.localPlayer} socket={this.props.socket}></HandOfCards>

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
