import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import styles from '../styles'

function mapStateToProps(state, { id }) {
    const { decks } = state
    return {
        deck: decks[id],
    }
}

class DeckTile extends Component {
    render() {
        const { deck, onPress } = this.props
        return (
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <Text style={localStyles.deckTitle}>
                    {deck.title}
                </Text>
                <Text style={localStyles.numOfCards}>
                    {`${Object.keys(deck.cards).length} cards`}
                </Text>
            </TouchableOpacity>
        );
    }
}

const localStyles = StyleSheet.create({
    deckTitle: {
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },

    numOfCards: {
        alignSelf: 'center',
        paddingTop: 20
    },
})

export default connect(mapStateToProps)(DeckTile);