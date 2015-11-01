'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');

let HandOfCards = connect()(React.createClass({
  render: function() {
    return (
      <View style={[handStyles.container]}>
        <Text>
          {this.props.cards}
        </Text>
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
