'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');

let GameBoard = connect()(React.createClass({
  render: function() {
    return (
      <View style={[gameBoardStyles.container]}>
      </View>
    );
  }
}));

let gameBoardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    height: styles.inPlayCardHeight * 2 + styles.padding * 3
  }
});

module.exports = GameBoard;
