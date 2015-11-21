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
 
          <HandOfCards></HandOfCards>

          <View style={roomStyles.playerArea}>
            <PlayerAvatar player={this.props.remotePlayer} 
                            life={this.props.remoteLife}>
            </PlayerAvatar>
            <ManaView mana={this.props.remoteMana}>
            </ManaView>
          </View>
 
          <View style={[roomStyles.gameBoard]}>
            <BoardOfCards cards={this.props.remoteBoard} 
                         player={this.props.remotePlayer}>
            </BoardOfCards>
            <BoardOfCards cards={this.props.localBoard} 
                         player={this.props.localPlayer}>
            </BoardOfCards>
          </View>
 
          <View style={[roomStyles.playerArea, globalStyles.buttonContainer]}>
            <PlayerAvatar player={this.props.localPlayer} 
                            life={this.props.localLife}>
            </PlayerAvatar>
            <ManaView mana={this.props.localMana}>
            </ManaView>
          </View>

          <HandOfCards cards={this.props.hand} 
                      playerMana={this.props.localMana}
                      player={this.props.localPlayer} 
                      socket={this.props.socket}>
          </HandOfCards>

        </View>

        <View style={roomStyles.rightButtonArea}>
            <Button style={globalStyles.button} 
            styleDisabled={{color: 'lightgray'}} 
                 disabled={this.props.turn != this.props.localPlayer} 
                  onPress={() => {
                let passAction = {type:'endTurn', 
                                  player:this.props.localPlayer};
                this.props.dispatch(passAction);
                this.props.socket.send(passAction);
            }}>
              End Turn
            </Button>
            <Button style={globalStyles.button} onPress={() => {
              this.props.dispatch({type:'setView', view:'welcome'});
              }}>
              Resign
            </Button>

        </View>
      
      </View>
  );
  }
}


let Device = require('react-native-device');

let roomStyles = StyleSheet.create({
  roomContainer: {
    flex:1,
    backgroundColor:'yellow',
    flexDirection: 'row',
    width: Device.width
  },
  gameBoard: {
    backgroundColor: 'purple',
    height: styles.inPlayCardHeight * 2,
  },
  gameArea: {
    backgroundColor:'red',
    width: Device.width - styles.buttonWidth - styles.padding*4
  },
  playerArea: {
    flex:0,
    backgroundColor:'blue',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  rightButtonArea : {
    justifyContent: 'center',
  }
});

module.exports = connect()(GameRoom);
