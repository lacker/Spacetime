let React = require('react-native');
let {
  StyleSheet,
} = React;

let Device = require('react-native-device');

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    margin: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },

});


// this seemed like worth not rewriting
// should do a PR to add Android I think
// https://github.com/APSL/react-native-button
let Button = require('apsl-react-native-button');
let buttonWidth = 60;
let baseHeight = (Device.height)/6;
let baseWidth = (Device.width-buttonWidth)/7.0;
module.exports = {
                  styles:styles, 
                  Button:Button,
                  buttonWidth:buttonWidth,
                  inPlayCardHeight: baseHeight,
                  cardHeight: baseHeight,
                  cardWidth: baseWidth,
                  manaJewelSize: {width:18, height:18},
                  padding: 5
                 };
