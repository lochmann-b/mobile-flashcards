import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Deck from './Deck'


export class Home extends Component {
  render() {
    return (
      <View>
          <TouchableOpacity onPress={ () => {this.props.navigation.navigate('Deck', {deck:'Deck1'})}}>
            <Text>
              Go to Deck 1
            </Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default createStackNavigator(
  {
    Home: connect(mapStateToProps, mapDispatchToProps)(Home),
    Deck: Deck

  })
