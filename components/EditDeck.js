import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import CardTile from './CardTile'
import TextButton from './TextButton'
import styles from '../styles'

class EditDeck extends Component {
    static navigationOptions = () => {
        return {
            title: `Edit`,           
        }
    }

    renderCardTile = (key) => {
        const { navigate } = this.props.navigation
        return (
            <View style={{}}>
                <CardTile cardId={key} />
                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
                    <TextButton onPress={() => navigate('EditCard', { cardId: key })} style={styles.editButton}>Edit</TextButton>
                    <TextButton onPress={() => navigate('DeleteCard', { cardId: key })} style={styles.deleteButton}>Delete</TextButton>
                </View>
            </View>
        )
    }

    render() {
        const { deck } = this.props
        const listData = deck.cards ? Object.keys(deck.cards).sort().map(key => ({ key })) : []

        return (
            <View style={styles.cardTable}>
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={listData}
                    renderItem={({ item }) => this.renderCardTile(item.key)}
                />
            </View>
        )
    }

}


function mapStateToProps( { decks }, { navigation }) {
    const deckId = navigation.getParam('deckId');
    const deck = decks[deckId]
    return {
        deck: deck,
    }
}
export default connect(mapStateToProps)(EditDeck);