import React from 'react';
import PropTypes from 'prop-types'
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

DeckTile.propTypes = {
    title: PropTypes.string.isRequired,
    numOfCards: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
}

export default DeckTile