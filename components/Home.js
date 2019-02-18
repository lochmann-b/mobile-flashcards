import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, TouchableOpacity, Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDecks, handleLoadDummyDecks, handleAddDeck } from '../actions/decks'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles'
import white from '../styles'
import DeckTile from './DeckTile'
import EditableListItem from './EditableListItem'

import { reset } from '../utils/api' // TODO remove


export class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: `Decks`,
      headerRight: (
        <TouchableOpacity onPress={navigation.getParam('addDeck')}>
          <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} ></Ionicons>
        </TouchableOpacity>
      ),
    }
  }

  addDeck = () => {
    const { navigation, dispatch } = this.props
    navigation.navigate('CreateDeck', { onAddDeck: deckTitle => dispatch(handleAddDeck(deckTitle)) })
  }

  componentDidMount() {
    this.props.navigation.setParams({ addDeck: this.addDeck })
    const { dispatch } = this.props
    //reset().then(() => {
    dispatch(handleLoadDecks())
      .then(
        () => {
          if (Object.keys(this.props.decks).length === 0) {
            dispatch(handleLoadDummyDecks())
          }
        }
      )


    //})
  }


  handleOnDelete = deckId => {
    Alert.alert('Delete Deck',
      `Would you really delete deck ${deckId}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => console.log('Ask me later pressed'),
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
        onEdit={() => navigate('EditDeck', { deckId: key })}
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


export default connect(mapStateToProps)(Home)