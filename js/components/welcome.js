'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Spacetime
        </Text>
        <View style={styles.buttonContainer}>
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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  }
});

module.exports = Welcome;
