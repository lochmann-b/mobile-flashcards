import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
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
                <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold' }}>
                    {deck.title}
                </Text>
                <Text style={{ alignSelf: 'center', paddingTop: 20 }}>
                    {`${Object.keys(deck.cards).length} cards`}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default connect(mapStateToProps)(DeckTile);