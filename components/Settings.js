import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton';
import { handleLoadDummyDecks } from '../actions/decks'

export class Settings extends Component {
  
  render() {
    const { dispatchLoadDecks, cardCount, deckCount, navigation } = this.props
    return (
      <View style={styles.container}>
          <Text>{`Found ${cardCount} cards in ${deckCount} decks`}</Text>
          <TextButton onPress={ () => navigation.navigate('ResetAll')}>
            Reset Local Store
          </TextButton>
          <TextButton onPress={ () => dispatchLoadDecks()}>
            Load Some Decks
          </TextButton>
          
      </View>
    )
  }
}


function mapStateToProps ( { cards = {}, decks = {}  }) {
  return {
    cardCount: Object.keys(cards).length,
    deckCount: Object.keys(decks).length
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    dispatchLoadDecks: () => dispatch(handleLoadDummyDecks())
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
