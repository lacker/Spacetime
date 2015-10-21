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
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          Welcome to Spacetime
        </Text>
        <View style={welcomeStyles.buttonContainer}>
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'register'});
            }} style={{backgroundColor: 'green', marginRight:10}}>
            Register
          </Button>
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'login'});
            }} style={{marginRight:10}}>
            Login
          </Button>
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

let welcomeStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  }
});

module.exports = Welcome;
