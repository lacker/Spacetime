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
      <View style={[gameBoardStyles.container]}>
      </View>
    );
  }
}));

let inPlayCardHeight = 60;
let padding = 10

let gameBoardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    height: inPlayCardHeight * 2 + padding * 3
  }
});

module.exports = GameBoard;
