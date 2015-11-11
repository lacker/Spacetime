'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');

let styles = require('../styles');
let globalStyles = styles.styles;
let Button = styles.Button;

let PlayerAvatar = require('./PlayerAvatar');
let HandOfCards = require('./HandOfCards');
let BoardOfCards = require('./BoardOfCards');
let ManaView = require('./ManaView');

class GameRoom extends React.Component {
  render() {
    
    return (
      <View style={roomStyles.roomContainer}>
        
        <View style={roomStyles.gameArea}>
 
          <HandOfCards type='remotePlayer'></HandOfCards>

          <View style={roomStyles.playerArea}>
            <PlayerAvatar type='remotePlayer' player={this.props.remotePlayer} life={this.props.remoteLife}></PlayerAvatar>
            <ManaView mana={this.props.remoteMana}></ManaView>
          </View>
 
          <View style={[roomStyles.gameBoard]}>
            <BoardOfCards type='remotePlayer' cards={this.props.remoteBoard} player={this.props.remotePlayer}></BoardOfCards>
            <BoardOfCards type='localPlayer' cards={this.props.localBoard} player={this.props.localPlayer}></BoardOfCards>
          </View>
 
          <View style={[roomStyles.playerArea, globalStyles.buttonContainer]}>
            <PlayerAvatar type='localPlayer' player={this.props.localPlayer} life={this.props.localLife} ></PlayerAvatar>
            <ManaView mana={this.props.localMana}></ManaView>
          </View>

          <HandOfCards type='localPlayer' cards={this.props.hand} player={this.props.localPlayer} socket={this.props.socket}></HandOfCards>

        </View>

        <View style={roomStyles.rightButtonArea}>
            <Button onPress={() => {
                if (this.props.turn == this.localPlayer) {
                  console.log("HEY")
                  let passAction = {type:'endTurn', player:this.props.localPlayer};
                  console.log(passAction)
                  this.props.socket.send(passAction);
                }
              }}>
              End Turn
            </Button>
            <Button onPress={() => {
              this.props.dispatch({type:'setView', view:'welcome'});
              }}>
              Resign
            </Button>

        </View>
      
      </View>
  );
  }
}

let roomStyles = StyleSheet.create({
  roomContainer: {
    flex:1,
    backgroundColor:'yellow',
    flexDirection: 'row',
  },
  gameBoard: {
    backgroundColor: 'purple',
    height: styles.inPlayCardHeight * 2
  },
  gameArea: {
    flex:1,
    backgroundColor:'red',
  },
  playerArea: {
    flex:0,
    backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  rightButtonArea : {
    width: 80,
    justifyContent: 'center',
  }
});

module.exports = connect()(GameRoom);
