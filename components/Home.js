import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator, TouchableOpacity, Platform} from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDecks, handleLoadDummyDecks } from '../actions/decks'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles'
import white from '../styles'
import DeckTile from './DeckTile'
import TextButton from './TextButton';


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
    const { navigation } = this.props
    navigation.navigate('CreateDeck')
  }

  componentDidMount() {
    this.props.navigation.setParams({addDeck: this.addDeck})

    const { dispatch } = this.props
    dispatch(handleLoadDecks())
      .then(
        () => {

          if (Object.keys(this.props.decks).length === 0) {
            console.log('decks', this.props.decks)
            dispatch(handleLoadDummyDecks())
          }
        }

      )
  }

  renderDeckTile = (key) => {
    const { navigate } = this.props.navigation
    return (
      <View style={{}}>
        <DeckTile id={key} onPress={() => navigate('Deck', { deckId: key })} />
        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <TextButton onPress={() => navigate('EditDeck', { deckId: key })} style={styles.editButton}>Edit</TextButton>
          <TextButton onPress={() => navigate('DeleteDeck', { deckId: key })} style={styles.deleteButton}>Delete</TextButton>
        </View>
      </View>
    )
  }

  render() {
    const { decks } = this.props
    const listData = decks ? Object.keys(decks).sort().map(key => ({ key })) : []

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