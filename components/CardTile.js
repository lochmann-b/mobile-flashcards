import React from 'react';
import { Text, View } from 'react-native'
import styles from '../styles'

const CardTile = (props) => {
    const { question, answer } = props
    return (
        <View style={styles.card} >
            <Text style={styles.question}>
                {question}
            </Text>
            <Text style={styles.answer}>
                {answer}
            </Text>
        </View>
    )
}

export default CardTile;