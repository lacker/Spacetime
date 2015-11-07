'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let styles = require('../styles');
let Card = require('./Card');

let HandOfCards = React.createClass({
  render: function() {
    let handCards;
    if (this.props.cards) {
      handCards = this.props.cards.map((cardInfo, i) =>
        <Card key={i} info={cardInfo} player={this.props.player} socket={this.props.socket}  inHand={{on:true}}/>
      );
    }
    return (
      <View style={[handStyles.container]}>
          {handCards}
      </View>
    );
  }
});

let handStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'pink',
    height: styles.cardHeight,
  }
});

module.exports = HandOfCards;
