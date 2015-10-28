'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let globalStyles = require('../styles').styles;

let GameBoard = connect()(React.createClass({
  render: function() {
    return (
      <View style={globalStyles.container}>
      
      </View>
    );
  }
}));

module.exports = GameBoard;
