import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import styles from '../styles'
import CardTile from './CardTile'
import TextButton from './TextButton'
import AnimatedCard from './AnimatedCard'
import { clearLocalNotifications, setLocalNotification } from '../utils/helpers'
import PropTypes from 'prop-types'



class Play extends Component {
    static navigationOptions = ({ navigation }) => {
        const deckTitle = navigation.getParam('deckTitle')
        return {
            title: `Now Playing ${deckTitle}`,
        }
    }

    state = {
        cardIndex: 0,
        answered: 0,
        correctAnswered: 0,
        finished: false
    }

    constructor(props) {
        super(props);
        this.child = React.createRef()
    }

    resetGame = () => {
        this.setState({
            cardIndex: 0,
            answered: 0,
            correctAnswered: 0,
            finished: false
        })
    }

    onAnswer = (knewIt) => {
        this.child.current.resetAnimation()
        this.nextCard(knewIt)

        clearLocalNotifications()
            .then(setLocalNotification)
    }

    nextCard = (knewIt) => {
        const cardCount = this.props.cards.length
        this.setState(current => {
            return {
                finished: cardCount - 1 === current.cardIndex + 1,
                cardIndex: cardCount > current.cardIndex + 1 ? current.cardIndex + 1 : 0,
                answered: current.answered + 1,
                correctAnswered: knewIt === true ? current.correctAnswered + 1 : current.correctAnswered,
            }
        })
    }

    noCards = () => {
        const { navigation, deck } = this.props
        return (
            <View style={styles.cardTable}>
                <Text style={styles.infoText} >This deck is empty</Text>
                <TextButton style={styles.loadButton} onPress={() => navigation.navigate('EditDeck', { deckId: deck.id })}>
                    Edit Deck
          </TextButton>
            </View>)
    }

    gameFinished = () => {
        const { navigation } = this.props
        const { correctAnswered, answered } = this.state
        return (
            <View>
                <Text style={styles.title}>
                    {`Correct answers: ${answered == 0 ? ' - ' : (correctAnswered / answered * 100).toFixed(1)}%`}
                </Text>
                <View style={styles.horizontalButtonContainer}>
                    <TextButton onPress={() => this.resetGame()} style={[styles.textButton, { backgroundColor: '#98FB98' }]}>Restart Quiz</TextButton>
                    <TextButton onPress={() => navigation.navigate('Home')} style={[styles.textButton, { backgroundColor: '#98FB98' }]}>Go To Decks</TextButton>
                </View>
            </View>
        )
    }

    gameRunning = () => {
        const { cards } = this.props
        const { cardIndex } = this.state
        const currentCard = cards[cardIndex]

        return (
            <View>
                <AnimatedCard ref={this.child}>
                    <CardTile question={currentCard.question} answer={currentCard.answer} faceUp={false} style={{ width: 220 }} />
                    <CardTile question={currentCard.question} answer={currentCard.answer} faceUp={true} style={{ width: 220 }} />
                </AnimatedCard>
                <View style={styles.horizontalButtonContainer}>
                    <TextButton onPress={() => this.onAnswer(true)} style={[styles.textButton, { backgroundColor: '#98FB98' }]}>I Knew It</TextButton>
                    <TextButton onPress={() => this.onAnswer(false)} style={[styles.textButton, { backgroundColor: '#ff7777' }]}>I Was Wrong</TextButton>
                </View>
            </View>
        )
    }

    render() {
        const { cards } = this.props
        const { cardIndex, finished } = this.state

        if (cards.length === 0) {
            return this.noCards()
        }

        return (
            <View style={styles.cardTable}>
                {finished === true
                    ? this.gameFinished()
                    : this.gameRunning()
                }
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

Play.propTypes = {
    deck: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(Play);