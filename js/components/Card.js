'use strict';

// A draggable card
// drag drop code example used: https://github.com/brentvatne/react-native-animated-demo-tinder
// panresponder docs: https://facebook.github.io/react-native/docs/panresponder.html

let React = require('react-native');
let {
  Animated, 
  PanResponder,
  StyleSheet,
  Text,
  View,
} = React;

let clamp = require('clamp');
let styles = require('../styles');

class Card extends React.Component {

  componentWillMount() {

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(1),
    }

    this._panResponder = PanResponder.create({

      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
                 Animated.spring(this.state.enter, {
            toValue: .75,
          }).start()

        this.state.pan.setOffset({x: this.state.pan.x._value, 
                                  y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
         let toValue = 0;         
         let distanceToBoard = styles.cardHeight + styles.cardHeight;
         if(Math.abs(this.state.pan.y._value) >= distanceToBoard) {
           console.log(this.props.playerMana + ' >= ' + this.props.cost);
           if (!this.props.inPlay 
               && this.props.playerMana >= this.props.cost) {
             toValue = -distanceToBoard;
             let playAction = {type:'play', 
                               cardId:this.props.id, 
                               player:this.props.player};
             this.props.socket.send(playAction);
           }
         }

         Animated.spring(this.state.enter, {
            toValue: 1,
          }).start()

        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        Animated.spring(this.state.pan, {
            toValue: {x: 0, y: toValue},
            friction: 4
        }).start()
      }
    })
  }

  render() {

    let name = this.props.name;
    let attack = this.props.attack;
    let defense = this.props.defense;

    let { pan, enter, } = this.state;
    let [translateX, translateY] = [pan.x, pan.y];
    let scale = enter;
    let animatedCardStyles = {transform: [{translateX}, {translateY}, {scale}]};
 
    return (
      <Animated.View style={[cardStyles.container, animatedCardStyles]} 
       {...this._panResponder.panHandlers}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{flex:1}}>
             {name}
          </Text>
          <Text style={{textAlign: 'right', backgroundColor: 'black', color:'white'}}>
           {this.props.cost}
          </Text>
        </View>
        <View style={[cardStyles.flexFill]}></View>
        <View style={{flexDirection: 'row'}}>
          <View style={[cardStyles.attackBackground]}>
            <Text>
               {attack}
            </Text>
          </View>
          <View style={[cardStyles.flexFill]}></View>
          <View style={[cardStyles.defenseBackground]}>
            <Text>
             {defense}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}

let cardStyles = StyleSheet.create({
  attackBackground: {
    backgroundColor: 'gray',
  },
  defenseBackground: {
    backgroundColor: 'red',
  },
  flexFill: {
    flex: 1,
  },  
  container: {
    height: styles.cardHeight,
    width: styles.cardWidth,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  }
});

module.exports = Card;