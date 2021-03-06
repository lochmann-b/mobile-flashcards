import React, { Component } from 'react'
import { View, FlatList, Text, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDecks, handleLoadDummyDecks, handleAddDeck, handleDeleteDeck } from '../actions/decks'
import styles, { white } from '../styles'
import DeckTile from './DeckTile'
import EditableListItem from './EditableListItem'
import AddButton from './AddButton'
import TextButton from './TextButton'
import PropTypes from 'prop-types'

export class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Tab a deck to play`,
      headerRight: (
        <AddButton onPress={navigation.getParam('addDeck')} />
      ),
    }
  }

  addDeck = () => {
    const { navigation, dispatchAddDeck } = this.props
    navigation.navigate('CreateDeck', { onAddDeck: deckTitle => dispatchAddDeck(deckTitle) })
  }

  componentDidMount() {
    this.props.navigation.setParams({ addDeck: this.addDeck })
    const { dispatchLoadDecks } = this.props
    dispatchLoadDecks()
  }


  handleOnDelete = deckId => {
    const { decks, dispatchDeleteDeck } = this.props
    Alert.alert('Delete Deck',
      `Really delete deck ${decks[deckId].title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatchDeleteDeck(decks[deckId]),
          style: 'destructive'
        },
      ],
      { cancelable: true },
    );
  }

  renderDeckTile = (key) => {
    const { navigate } = this.props.navigation
    const { decks } = this.props
    const cards = decks[key].cards ? decks[key].cards : []
    return (
      <EditableListItem
        //setting the deck title here is UGLY. But doing it in EditDeck.componentDidMount is far to slow
        onEdit={() => navigate('EditDeck', { deckId: key, deckTitle: decks[key].title })}
        onDelete={() => this.handleOnDelete(key)}>
        <DeckTile
          title={decks[key].title}
          numOfCards={cards.length}
          onPress={() => navigate('Play', { deckId: key, deckTitle: decks[key].title })}
        />
      </EditableListItem>
    )
  }

  ListEmptyComponent = () => {
    const { dispatchLoadDummyDecks } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.infoText} >No decks found. Should I load some exciting flashcards?</Text>
        <TextButton style={styles.loadButton} onPress={() => dispatchLoadDummyDecks()}>
          Load
      </TextButton>
      </View>)
  }

  render() {
    const { loading, decks } = this.props
    const listData = decks ? Object.keys(decks).sort((a, b) => decks[b].timestamp - decks[a].timestamp).map(key => ({ key })) : []
    return (
      <View style={styles.cardTable}>
        {loading
          ? (<ActivityIndicator size="large" color={white} />)
          : (<FlatList
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={listData}
            renderItem={({ item }) => this.renderDeckTile(item.key)}
            ListEmptyComponent={this.ListEmptyComponent}
          />)
        }

      </View>
    )
  }
}

function mapStateToProps({ decks, loading }) {
  return {
    decks,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    dispatchLoadDummyDecks: () => dispatch(handleLoadDummyDecks()),
    dispatchLoadDecks: () => dispatch(handleLoadDecks()),
    dispatchAddDeck: (title) => dispatch(handleAddDeck(title)),
    dispatchDeleteDeck: (deck) => dispatch(handleDeleteDeck(deck))
  })
}

Home.propTypes = {
  decks: PropTypes.object,
  loading: PropTypes.bool,
  dispatchLoadDecks: PropTypes.func.isRequired,
  dispatchLoadDecks: PropTypes.func.isRequired,
  dispatchAddDeck: PropTypes.func.isRequired,
  dispatchDeleteDeck: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)