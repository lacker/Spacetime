'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let { connect } = require('react-redux');

let styles = require('../styles');
let globalStyles = styles.styles;
let Button = styles.Button;

class Welcome extends React.Component {
  render() {
    let welcomeString = 'Welcome to Wizard Duel';
    let actionButton =           
          <Button textStyle={{color: 'white'}} style={[globalStyles.button,{backgroundColor: 'green'}]} onPress={() => {
              this.props.dispatch({type:'setView', view:'register'});
            }}>
            Login
          </Button>;
    let guestPlay = null;
    if (!this.props.anonymous) {
      welcomeString += ', ' +  this.props.player;
      actionButton = 
          <Button textStyle={{color: 'white'}} style={[globalStyles.button,{backgroundColor: 'green'}]} onPress={() => {
              let seekAction = {type:'seeking', player:this.props.player};
              this.props.dispatch(seekAction);
              this.props.socket.send(seekAction);
            }}>
            Play
          </Button>;      
    } else {
      guestPlay = <Button style={globalStyles.button} onPress={() => {
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
          <Button style={globalStyles.button} onPress={() => {
              this.props.dispatch({type:'setView', view:'console'});
            }}>
            Console
          </Button>
        </View>
      </View>
    );
  }
}

module.exports = connect()(Welcome);
