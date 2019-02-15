import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
import { getDeckIdFromCardId} from '../utils/helpers'
import styles from '../styles'

class CardTile extends Component {
    render() {
        const { card } = this.props
        return (
            <View style={styles.card} >
                <Text style={styles.question}>
                    {card.question}
                </Text>
                <Text style={styles.answer}>
                    {card.answer}
                </Text>
            </View>
        );
    }
}


function mapStateToProps( { decks }, { cardId }) {
    const deckId = getDeckIdFromCardId(cardId)
    const card = decks[deckId].cards[cardId];
    return {
        card: card
    };
}


export default connect(mapStateToProps)(CardTile);