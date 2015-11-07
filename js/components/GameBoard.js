'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');

class GameBoard extends React.Component {
  render() {
    return (
      <View style={[gameBoardStyles.container]}>
      </View>
    );
  }
}

let gameBoardStyles = StyleSheet.create({
  container: {
    backgroundColor: 'purple',
    height: styles.inPlayCardHeight * 2
  }
});

module.exports = connect()(GameBoard);
