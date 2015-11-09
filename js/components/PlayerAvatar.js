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
      <View style={playerAvatarStyles.avatarContainer}>
        <Text>
          {this.props.player}
        </Text>
        <View style={{flex:1}}></View>
        <View>
          <Text>
            {this.props.life}
          </Text>
        </View>
      </View>
    );
  }
}

let playerAvatarStyles = StyleSheet.create({
  avatarContainer: {
    width: 120,
    height: styles.cardHeight,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white'

  }
});

module.exports = PlayerAvatar;
