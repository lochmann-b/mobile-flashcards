import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, Alert } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDecks, handleLoadDummyDecks, handleAddDeck, handleDeleteDeck } from '../actions/decks'
import styles from '../styles'
import white from '../styles'
import DeckTile from './DeckTile'
import EditableListItem from './EditableListItem'
import AddButton from './AddButton'


export class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Decks`,
      headerRight: (
        <AddButton onPress={navigation.getParam('addDeck')}/>
      ),
    }
  }

  addDeck = () => {
    const { navigation, dispatchAddDeck } = this.props
    navigation.navigate('CreateDeck', { onAddDeck: deckTitle => dispatchAddDeck(deckTitle) })
  }

  componentDidMount() {
    this.props.navigation.setParams({ addDeck: this.addDeck })
    const { dispatchLoadDummyDecks, dispatchLoadDecks } = this.props
    
    dispatchLoadDecks()
      .then(
        () => {
          if (Object.keys(this.props.decks).length === 0) {
            dispatchLoadDummyDecks()
          }
        }
      )
  }


  handleOnDelete = deckId => {
    const { decks, dispatchDeleteDeck } = this.props
    Alert.alert('Delete Deck',
      `Really delete deck ${decks[deckId].title}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => dispatchDeleteDeck(decks[deckId]),
          style: 'destructive'
        },
      ],
      { cancelable: false },
    );
  }

  renderDeckTile = (key) => {
    const { navigate } = this.props.navigation
    const { decks } = this.props
    return (
      <EditableListItem
        //setting the deck title here is UGLY. But doing it in EditDeck.componentDidMount is far to slow
        onEdit={() => navigate('EditDeck', { deckId: key, deckTitle: decks[key].title })}
        onDelete={() => this.handleOnDelete(key)}>
        <DeckTile
          title={decks[key].title}
          numOfCards={decks[key].cards.length}
          onPress={() => navigate('Deck', { deckId: key })}
        />
      </EditableListItem>
    )
  }

  render() {
    const { decks } = this.props
    const listData = decks ? Object.keys(decks).sort((a, b) => decks[b].timestamp - decks[a].timestamp).map(key => ({ key })) : []

    if (listData.length === 0) {
      return <View style={styles.cardTable}>
        <ActivityIndicator size='large' color={white} />
      </View>
    }
    return (
      <View style={styles.cardTable}>
        <FlatList
          contentContainerStyle={styles.listContent}
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

const mapDispatchToProps = dispatch => {
  return ({
    dispatchLoadDummyDecks: () => dispatch(handleLoadDummyDecks()),
    dispatchLoadDecks: () => dispatch(handleLoadDecks()),
    dispatchAddDeck: (title) => dispatch(handleAddDeck(title)),
    dispatchDeleteDeck: (deck) => dispatch(handleDeleteDeck(deck))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)