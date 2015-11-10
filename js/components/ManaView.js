'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
} = React;

let styles = require('../styles');
let ManaJewel = require('./ManaJewel');

class ManaView extends React.Component {
  render() {
    let jewels = [];
    let maxMana = 10;
    for (let x=0;x<maxMana;x++) {
      if (x < this.props.mana) {
        jewels.push({full:true, position: x});
      } else {
        jewels.push({full:false, position: x});
      }
    }
    let jewelViews = jewels.map((jewelInfo, i) =>
        <ManaJewel key={i} full={jewelInfo.full} />
      );
    return (
      <View style={manaViewStyles.container}>
        {jewelViews}
      </View>
    );
  }
}

let manaViewStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: styles.manaJewelSize.width*5 + styles.padding*6,
    height: styles.manaJewelSize.height * 2 + styles.padding,
    backgroundColor: 'white'
  }
});

module.exports = ManaView;
