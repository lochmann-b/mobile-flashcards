import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDummyDecks } from '../actions/decks'
import styles from '../styles'
import DeckTile from './DeckTile'
import TextButton from './TextButton';


export class Home extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleLoadDummyDecks())
  }

  renderDeckTile = (key) => {
    return (
      <View style={{ flex: 1, alignSelf: 'center' }}>
        <DeckTile id={key} onPress={() => this.props.navigation.navigate('Deck', { deckId: key })} />
        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <TextButton style={styles.editButton}>Edit</TextButton>
          <TextButton style={styles.deleteButton}>Delete</TextButton>
        </View>
      </View>
    )
  }

  render() {
    const { decks } = this.props
    const listData = decks ? Object.keys(decks).map(key => ({ key })) : []

    if (listData.length === 0) {
      return <View>
        <Text>Loading...</Text>
      </View>
    }
    return (
      <View style={styles.cardTable}>
        <Text style={styles.title}>Choos a deck</Text>
        <FlatList
          contentContainerStyle={styles.decksList}
          data={listData}
          renderItem={({ item }) => this.renderDeckTile(item.key)}
        />
      </View>
    )
  }
}

function mapStateToProps({ decks }) {
  return {
    decks
  }
}


export default connect(mapStateToProps)(Home)