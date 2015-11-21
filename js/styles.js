let React = require('react-native');
let {
  StyleSheet,
} = React;

let Device = require('react-native-device');

let buttonWidth = 80;
let padding = 5;

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
  button: {
    width:buttonWidth,
    height:40,
    backgroundColor: 'white',
    borderWidth: 1,
    color: 'black',
    borderColor: 'black',
    marginBottom: padding,
    borderRadius: 2,
  }
});

let Button = require('react-native-button');
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
                  padding: padding
                 };
