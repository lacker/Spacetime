'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let styles = require('../styles');

class PlayerAvatar extends React.Component {
  render() {
    return (
      <Text style={playerAvatarStyles.avatarContainer}>
       {this.props.player}
      </Text>
    );
  }
}

let playerAvatarStyles = StyleSheet.create({
  avatarContainer: {
    width: 120,
    height: styles.cardHeight,
    textAlign: 'center',

  }
});

module.exports = PlayerAvatar;
