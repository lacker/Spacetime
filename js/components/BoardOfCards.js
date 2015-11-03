'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');
let Card = require('./Card');

let BoardOfCards = connect()(React.createClass({
  render: function() {
    let boardCards;
    if (this.props.cards) {
      boardCards = this.props.cards.map((cardInfo, i) =>
        <Card info={cardInfo} player={this.props.player} />
      );
    }
    return (
      <View style={[handStyles.container]}>
          {boardCards}
      </View>
    );
  }
}));

let handStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: styles.cardHeight,
  }
});

module.exports = BoardOfCards;
