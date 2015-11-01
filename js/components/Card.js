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
    let name = '';
    let attack = '';
    let defense = '';
    
    if(this.props.info) {
      name = this.props.info['name'];
      attack = this.props.info['attack'];
      defense = this.props.info['defense'];
    }
    return (
      <View style={[cardStyles.container]}>
        <Text>
           {name}
        </Text>
        <View style={[cardStyles.flexFill]}></View>
        <View style={[cardStyles.cardStatsContainer]}>
          <View style={[cardStyles.attackBackground]}>
            <Text>
               {attack}
            </Text>
          </View>
          <View style={[cardStyles.flexFill]}></View>
          <View style={[cardStyles.defenseBackground]}>
            <Text>
             {defense}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}));

let cardStyles = StyleSheet.create({
  cardStatsContainer: {
    flexDirection: 'row',
  },  
  attackBackground: {
    backgroundColor: 'gray',
  },
  defenseBackground: {
    backgroundColor: 'red',
  },
  flexFill: {
    flex: 1,
  },  
  container: {
    height: styles.cardHeight,
    width: styles.cardWidth,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  }
});

module.exports = Card;
