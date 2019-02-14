import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import { Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { handleLoadDummyDecks } from '../actions/decks'
import styles from '../styles';
import DeckTile from './DeckTile'


export class Home extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(handleLoadDummyDecks())
  }


  render() {
    const { decks } = this.props
    return (
      <View style={styles.cardTable}>
        {
          Object.keys(decks).map(
            key => (<DeckTile  id={key} key={key} />)
          )
        }
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