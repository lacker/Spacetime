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

let GameRoom = connect()(React.createClass({
  render: function() {
    let welcomeString = 'Fight!';
    if (!this.props.players || 
        this.props.players.length < 2) {
      welcomeString = 'Waiting for Opponent';
    }
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          {welcomeString}
        </Text>
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
