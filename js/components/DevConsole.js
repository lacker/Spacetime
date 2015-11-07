'use strict';

let React = require('react-native');
let {
  Text,
  View,
} = React;

let { connect } = require('react-redux');

let styles = require('../styles');
let globalStyles = styles.styles;
let Button = styles.Button;

class DevConsole extends React.Component {
  render() {
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
          this.props.dispatch({type:'setView', view:'welcome'});
        }}>
          Exit
        </Button>
        <Text style={globalStyles.instructions}>
          {this.props.log && this.props.log.join('\n')}
        </Text>
      </View>
    );
  }
};

module.exports = connect()(DevConsole);
