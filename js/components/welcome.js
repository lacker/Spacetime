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

let Welcome = React.createClass({
  render: function() {
    let welcomeString = 'Welcome to Spacetime';
    let actionButton =           
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'register'});
            }} style={{backgroundColor: 'green'}}>
            Login
          </Button>;
    if (this.props.store.getState().username) {
      welcomeString += ', ' +  this.props.store.getState().username;
      actionButton = 
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'play'});
            }} style={{backgroundColor: 'green'}}>
            Play
          </Button>;      
    } 
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          {welcomeString}
        </Text>
        <View style={globalStyles.buttonContainer}>
          {actionButton}
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'console'});
            }}>
            Console
          </Button>
        </View>
      </View>
    );
  }
});

module.exports = Welcome;
