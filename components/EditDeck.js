import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native'
import CardTile from './CardTile'
import TextButton from './TextButton'
import styles from '../styles'
import EditableListItem from './EditableListItem';

class EditDeck extends Component {
    static navigationOptions = () => {
        return {
            title: `Edit`,
        }
    }

    renderCardTile = (cardId) => {
        const { navigate } = this.props.navigation
        const { cards } = this.props
        const card = cards[cardId]
        return (
            <EditableListItem
                onEdit={() => navigate('EditCard', { cardId: cardId })} style={styles.editButton}
                onDelete={() => navigate('DeleteCard', { cardId: cardId })} style={styles.deleteButton}>
                <CardTile question={card.question} answer={card.answer} />
            </EditableListItem>
        )
    }

    render() {
        const { deck } = this.props
        const listData = deck.cards.map(key => ({ key }))
        return (
            <View style={styles.cardTable}>
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={listData}
                    renderItem={({ item }) => this.renderCardTile(item.key, deck.id)}
                />
            </View>
        )
    }
}


function mapStateToProps({ decks, cards }, { navigation }) {
    const deckId = navigation.getParam('deckId');
    const deck = decks[deckId]
    return {
        deck,
        cards: deck.cards.reduce((acc, cur) => ({ ...acc, [cur]: cards[cur] }), {})
    }
}
export default connect(mapStateToProps)(EditDeck);