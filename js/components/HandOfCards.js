'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');

let HandOfCards = connect()(React.createClass({
  render: function() {
    return (
      <View style={[handStyles.container]}>
      </View>
    );
  }
}));

let handStyles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    height: styles.cardHeight,
  }
});

module.exports = HandOfCards;
