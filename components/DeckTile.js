import React from 'react';

import { Text, TouchableOpacity } from 'react-native'
import styles from '../styles'

const DeckTile = (props) => {
    const { title, numOfCards, onPress } = props
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.deckTitle}>
                {title}
            </Text>
            <Text style={styles.numOfCards}>
                { `${numOfCards} cards` }
            </Text>
        </TouchableOpacity>
    )
}

export default DeckTile