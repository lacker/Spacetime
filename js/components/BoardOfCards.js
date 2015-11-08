'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let styles = require('../styles');
let Card = require('./Card');

class BoardOfCards extends React.Component {
  render() {
    let boardCards;
    if (this.props.cards) {
      boardCards = this.props.cards.map((cardInfo, i) =>
        <Card key={i} id={cardInfo.id} name={cardInfo.name} attack={cardInfo.attack} defense={cardInfo.defense} player={this.props.player} inPlay={{on:true}} />
      );
    }
    return (
      <View style={[boardStyles.container]}>
          {boardCards}
      </View>
    );
  }
}

let boardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: styles.cardHeight,
  }
});

module.exports = BoardOfCards;
