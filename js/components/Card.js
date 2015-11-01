'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');

let Card = connect()(React.createClass({
  render: function() {
    return (
      <View style={[cardStyles.container]}>
        <Text>
           {this.props.info}
        </Text>
      </View>
    );
  }
}));

let cardStyles = StyleSheet.create({
  container: {
    height: styles.cardHeight,
    width: styles.cardWidth,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  }
});

module.exports = Card;
