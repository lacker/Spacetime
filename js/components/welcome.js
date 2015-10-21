'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let globalStyles = require('../styles');

// this seemed like worth not rewriting
// should do a PR to add Android I think
// https://github.com/APSL/react-native-button
let Button = require('apsl-react-native-button');

let DevConsole = require('./devconsole');

let { connect } = require('react-redux');

//// Set up the view

// Just pipe all the redux state through as props
function select(state) {
  return state;
}

let Welcome = connect(select)(React.createClass({
  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={welcomeStyles.welcome}>
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
}));

let welcomeStyles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});

module.exports = Welcome;
