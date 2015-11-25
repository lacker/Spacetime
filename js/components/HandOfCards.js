'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let styles = require('../styles');
let Card = require('./Card');

class HandOfCards extends React.Component {
  render() {
    let handCards;
    if (this.props.cards) {
      handCards = this.props.cards.map((cardInfo, i) =>
        <Card key={i} 
               id={cardInfo.id} 
             name={cardInfo.name} 
           attack={cardInfo.attack} 
          defense={cardInfo.defense} 
             text={cardInfo.text} 
             cost={cardInfo.cost} 
             type={cardInfo.type} 
           effect={cardInfo.effect} 
           player={this.props.player} 
             turn={this.props.turn}
       playerMana={this.props.playerMana} 
           socket={this.props.socket} 
           inPlay={false} />
      );
    }
    return (
      <View style={[handStyles.container]}>
          {handCards}
      </View>
    );
  }
};

let handStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'pink',
    height: styles.cardHeight,
  }
});

module.exports = HandOfCards;