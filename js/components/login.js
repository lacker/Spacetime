'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

let { connect } = require('react-redux');


let gStyles = require('../styles');
let globalStyles = gStyles.styles;
let Button = gStyles.Button;

let Login = connect()(React.createClass({
  render: function() {
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
           onChangeText={(text) => this.props.dispatch({type:'register', username:text, anonymous:false})}
           value={this.props.anonymous ? '' : this.props.username}>
        </TextInput>
        <View style={globalStyles.buttonContainer}>
          <Button onPress={() => {
            let username = this.props.username;
            if (!username) {
              alert("You need to choose a username in order to register.");
            } else {
              this.props.dispatch({type:'setView', view:'welcome'});
                let hello = {type: 'hello', username: username};
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
}));


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

module.exports = Login;
