'use strict';

let React = require('react-native');
let {
  StyleSheet,
  Text,
  View,
} = React;

let Button = require('apsl-react-native-button');

let { connect } = require('react-redux');

//// Set up the view

// Just pipe all the redux state through as props
function select(state) {
  return state;
}

let Login = connect(select)(React.createClass({
  render: function() {
    let title = this.props.mode[0].toUpperCase() + this.props.mode.substr(1);
    return (
      <View style={styles.container}>
        <Text>{{title}}</Text>
        <Button onPress={() => {
          this.props.store.dispatch({type:'setView', view:'welcome'});
        }}>
          Exit
        </Button>
      </View>
    );
  }
}));

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = Login;
