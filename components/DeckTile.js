import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../styles'

function mapStateToProps(state, { id }) {
    const { decks } = state
    return {
        deck:decks[id],
    }
}

class DeckTile extends Component {
    render() {
        const { deck } = this.props
        return (
            <View style={styles.card}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Deck', { deckId: id }) }}>
                    <Text>
                        {deck.title}
                    </Text>
                    <Text>
                        {`${Object.keys(deck.cards).length} cards in this deck`}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default connect(mapStateToProps)(DeckTile);