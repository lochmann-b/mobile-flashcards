import React from 'react';
import { Text, View } from 'react-native'
import styles from '../styles'
import PropTypes from 'prop-types'

const CardTile = (props) => {
    const { question, answer, faceUp = true, style } = props
    return (
        <View style={[styles.card, style]} >
            <Text style={styles.question}>
                {question}
            </Text>
            {faceUp && <Text style={styles.answer}>
                {answer}
            </Text>}
        </View>
    )
}

CardTile.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    faceUp: PropTypes.bool
}

export default CardTile;