'use strict';

let React = require('react-native');
let {
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

let Login = connect(select)(React.createClass({
  render: function() {
    let title = this.props.mode[0].toUpperCase() + this.props.mode.substr(1);
    return (
      <View style={globalStyles.container}>
        <Text>{{title}}</Text>
        <Button onPress={() => {
          this.props.store.dispatch({type:'setView', view:'welcome'});
        }}>
          Exit
        </Button>
      </View>
    );
  }
}));

module.exports = Login;
