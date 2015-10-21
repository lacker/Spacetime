'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let globalStyles = require('../styles');

let Button = require('apsl-react-native-button');

let DevConsole = React.createClass({
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
});

module.exports = DevConsole;
