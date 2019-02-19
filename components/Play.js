import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../styles';
import CardTile from './CardTile';
import CardWithButtons from './CardWithButtons'

class Play extends Component {
    static navigationOptions = ({ navigation }) => {
        const deckTitle = navigation.getParam('deckTitle')
        return {
            title: `Now Playing ${deckTitle}`,
        }
    }

    state = {
        cardIndex: 0,
        faceUp: false,
        answered: 0,
        correctAnswered: 0
    }

    flipCard = () => {
        this.setState(current => {
            return { faceUp: !current.faceUp }
        })
    }

    iKnewIt = () => {
        this.onAnswered(true)
    }

    iWasWrong = () => {
        this.onAnswered(false)
    }

    onAnswered = (knewIt) => {
        const cardCount = this.props.cards.length
        this.setState(current => {
            return {
                 faceUp: false,
                 cardIndex: cardCount > current.cardIndex + 1 ? current.cardIndex + 1 : 0,
                 answered: current.answered + 1,
                 correctAnswered: knewIt === true ? current.correctAnswered + 1 : current.correctAnswered
            }
        })
    }

    render() {
        const { deck, cards } = this.props
        const { cardIndex, faceUp, correctAnswered, answered } = this.state
        const currentCard = cards[cardIndex]
        return (
            <View style={styles.center}>
                    <Text style={styles.title}>
                        {`Correct answers: ${ answered == 0 ? ' - ' : (correctAnswered / answered * 100).toFixed(1) }%`}
                    </Text>
                    <CardWithButtons buttonOptions={[
                        {
                            id: 1,
                            action: this.iKnewIt,
                            style: [styles.textButton, {backgroundColor:'#98FB98'}],
                            text: 'I was right'
                        },
                        {
                            id: 2,
                            action: this.iWasWrong,
                            style: [styles.textButton, {backgroundColor:'#ff7777'}],
                            text: 'I was wrong'
                        }
                    ]}
                    onPress={this.flipCard}
                    >
                        <CardTile question={currentCard.question} answer={currentCard.answer} faceUp={faceUp} />
                    </CardWithButtons>
                
            </View>
        )
    }
}


function mapStateToProps({ decks, cards }, { navigation }) {
    const deckId = navigation.getParam('deckId');
    const deck = decks[deckId]
    return {
        deck,
        cards: deck.cards.map(cardId => cards[cardId])
    }
}


export default connect(mapStateToProps)(Play);