'use strict';

let React = require('react-native');
let {
  Text,
  View,
} = React;

let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let DevConsole = React.createClass({
  render: function() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          Dev Console
        </Text>
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