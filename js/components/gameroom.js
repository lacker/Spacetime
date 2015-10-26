'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let GameRoom = React.createClass({
  render: function() {
    console.log("RENDER GAME ROOM")
    console.log(this.props.store.getState())
    console.log("RENDER GAME ROOM")
    let welcomeString = 'Fight!';
    if (!this.props.store.getState().players || 
        this.props.store.getState().players.length < 2) {
      welcomeString = 'Waiting for Opponent';
    }
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          {welcomeString}
        </Text>
        <View style={globalStyles.buttonContainer}>
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'welcome'});
            }}>
            Resign
          </Button>
        </View>
      </View>
    );
  }
});

module.exports = GameRoom;
