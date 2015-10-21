'use strict';

let React = require('react-native');
let {
  Text,
  View,
} = React;

let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let Login = React.createClass({
  render: function() {
    let title = this.props.mode[0].toUpperCase() + this.props.mode.substr(1);
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          {{title}}
        </Text>
        <Button onPress={() => {
          this.props.store.dispatch({type:'setView', view:'welcome'});
        }}>
          Exit
        </Button>
      </View>
    );
  }
});

module.exports = Login;
