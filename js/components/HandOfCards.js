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
    borderColor: 'purple',
    borderWidth: 1,
    height: styles.cardHeight + styles.padding,
  }
});

module.exports = HandOfCards;
