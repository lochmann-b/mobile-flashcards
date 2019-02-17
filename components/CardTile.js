import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native'
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


function mapStateToProps( { cards }, { cardId }) {
    const card = cards[cardId];
    return {
        card
    };
}


export default connect(mapStateToProps)(CardTile);