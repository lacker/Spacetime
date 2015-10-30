'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');
let globalStyles = require('../styles').styles;

let PlayerAvatar = connect()(React.createClass({
  render: function() {
    return (
      <Text style={playerAvatarStyles.avatarContainer}>
       {this.props.username}
      </Text>
    );
  }
}));

let playerAvatarStyles = StyleSheet.create({
  avatarContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 120,
    height: 60,
    textAlign: 'center',

  }
});

module.exports = PlayerAvatar;
