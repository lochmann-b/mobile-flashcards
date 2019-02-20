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
          <Text style={styles.header}>{`Found ${cardCount} cards in ${deckCount} decks`}</Text>
          <TextButton style={styles.resetAll} onPress={ () => navigation.navigate('ResetAll')}>
            Reset Local Store
          </TextButton>
          <TextButton style={styles.load} onPress={() => dispatchLoadDecks()}>
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
    flex: 1,
    alignItems: 'center'
  },
  header:{
    fontSize: 20,
    alignSelf: 'center'
  },

  load: {
    padding: 10,
    borderColor:"#ff0000",
    backgroundColor: '#ffffff',
    margin: 10,
    width: 140,
    borderWidth: 1,
    borderRadius: 2
  },

  resetAll: {
    padding: 10,
    borderColor:"#ff0000",
    backgroundColor: '#ff7777',
    margin: 10,
    width: 140,
    borderWidth: 1,
    borderRadius: 2
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
