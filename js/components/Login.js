'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

let { connect } = require('react-redux');
let styles = require('../styles');
let globalStyles = styles.styles;
let Button = styles.Button;

class Login extends React.Component {
  render() {
    let title = this.props.mode[0].toUpperCase() + this.props.mode.substr(1);
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>
          {{title}}
        </Text>
        <Text style={loginStyles.formLabel}>
          Choose a Username
        </Text>
        <TextInput
           style={loginStyles.textInput}
           autoFocus={true}
           onChangeText={(text) => this.tempUsername = text}
           value={this.tempUsername}>
        </TextInput>
        <View style={globalStyles.buttonContainer}>
          <Button onPress={() => {
            if (!this.tempUsername) {
              alert("You need to choose a username in order to register.");
            } else {
              this.props.dispatch({type:'register', player:this.tempUsername, anonymous:false});
              this.props.dispatch({type:'setView', view:'welcome'});
              let hello = {type: 'hello', player: this.tempUsername};
              this.props.socket.send(hello);
            }
          }}  style={{backgroundColor: 'green'}}>
            Login
          </Button>
          <Button onPress={() => {
            this.props.dispatch({type:'setView', view:'welcome'});
          }}>
            Cancel
          </Button>
        </View>
      </View>
    );
  }
}


let loginStyles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    width: 200, 
    height: 40, 
    padding: 8,
    borderRadius: 6,
    borderColor: 'gray', 
    borderWidth: 1
  },
  formLabel: {
    fontSize: 20,
    marginBottom: 10
  }
});

module.exports = connect()(Login);
