'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');

let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let Welcome = connect()(React.createClass({
  render: function() {
    let welcomeString = 'Welcome to Spacetime';
    let actionButton =           
          <Button onPress={() => {
              this.props.dispatch({type:'setView', view:'register'});
            }} style={{backgroundColor: 'green'}}>
            Login
          </Button>;
    let guestPlay = null;
    if (!this.props.anonymous) {
      welcomeString += ', ' +  this.props.player;
      actionButton = 
          <Button onPress={() => {
              let seekAction = {type:'seeking', player:this.props.player};
              this.props.dispatch(seekAction);
              this.props.socket.send(seekAction);
            }} 
            style={{backgroundColor: 'green'}}>
            Play
          </Button>;      
    } else {
      guestPlay = <Button onPress={() => {
              let seekAction = {type:'seeking', player:this.props.player};
              this.props.dispatch(seekAction);
              this.props.socket.send(seekAction);
            }} 
            >
            Play as Guest
          </Button>;      
    } 
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          {welcomeString}
        </Text>
        <View style={globalStyles.buttonContainer}>
          {actionButton}
          {guestPlay}
          <Button onPress={() => {
              this.props.dispatch({type:'setView', view:'console'});
            }}>
            Console
          </Button>
        </View>
      </View>
    );
  }
}));

module.exports = Welcome;
