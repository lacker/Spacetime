'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let globalStyles = require('../styles');

let Button = require('apsl-react-native-button');

let { connect } = require('react-redux');

//// Set up the view

// Just pipe all the redux state through as props
function select(state) {
  return state;
}

let DevConsole = connect(select)(React.createClass({
  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button onPress={() => {
          this.props.store.dispatch({type:'setView', view:'welcome'});
        }}>
          Exit
        </Button>
        <Text style={globalStyles.instructions}>
          {this.props.log && this.props.log.join('\n')}
        </Text>
      </View>
    );
  }
}));

module.exports = DevConsole;
