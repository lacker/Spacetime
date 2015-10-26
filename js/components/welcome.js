'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let Welcome = React.createClass({
  render: function() {
    let welcomeString = 'Welcome to Spacetime';
    let actionButton =           
          <Button onPress={() => {
              this.props.store.dispatch({type:'setView', view:'register'});
            }} style={{backgroundColor: 'green'}}>
            Login
          </Button>;
    let guestPlay = null;
    if (!this.props.store.getState().anonymous) {
      welcomeString += ', ' +  this.props.store.getState().username;
      actionButton = 
          <Button onPress={() => {
              let seekAction = {type:'seeking', username:this.props.store.getState().username};
              this.props.store.dispatch(seekAction);
              this.props.socket.send(seekAction);
            }} 
            style={{backgroundColor: 'green'}}>
            Play
          </Button>;      
    } else {
      guestPlay = <Button onPress={() => {
              let seekAction = {type:'seeking', username:this.props.store.getState().username};
              this.props.store.dispatch(seekAction);
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
              this.props.store.dispatch({type:'setView', view:'console'});
            }}>
            Console
          </Button>
        </View>
      </View>
    );
  }
});

module.exports = Welcome;
