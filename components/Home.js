import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDummyDecks } from '../actions/decks'


export class Home extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleLoadDummyDecks())
  }


  render() {
    const { decks } = this.props
    return (
      Object.keys(decks).map(
        key => (<View key={key}>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('Deck', { deckId: key }) }}>
            <Text>
              Go to Deck {key}
            </Text>
          </TouchableOpacity>
        </View>)
      )
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Home)