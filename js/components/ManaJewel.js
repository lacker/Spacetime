'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
} = React;

let styles = require('../styles');

class ManaJewel extends React.Component {
  render() {
    console.log(this.props)
    let fullStyle = manaJewelStyles.empty;
    if (this.props.full) {
      fullStyle = manaJewelStyles.full;
    }
    return (
      <View style={[manaJewelStyles.container,fullStyle]}>
      </View>
    );
  }
}

let manaJewelStyles = StyleSheet.create({
  container: {
    width: styles.manaJewelSize.width,
    height: styles.manaJewelSize.height,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: styles.manaJewelSize.width/2,
    marginLeft: styles.padding,
    marginBottom: styles.padding
  },
  full: {
    backgroundColor: 'blue'
  },
  empty: {
    backgroundColor: 'white'

  }
});

module.exports = ManaJewel;
