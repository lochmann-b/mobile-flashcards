import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import styles from '../styles'
import CardTile from './CardTile'
import TextButton from './TextButton'
import AnimatedCard from './AnimatedCard'



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
    }

    constructor(props) {
        super(props);
        this.child = React.createRef()
    }

    onAnswer = (knewIt) => {
        this.child.current.resetAnimation()
        this.nextCard(knewIt)
    }

    nextCard = (knewIt) => {
        const cardCount = this.props.cards.length
        this.setState(current => {
            return {
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
          <TextButton style = {styles.loadButton} onPress={() => navigation.navigate('EditDeck', {deckId: deck.id})}>
            Edit Deck
          </TextButton>
        </View>)
      }

    render() {
        const { cards } = this.props
        const { cardIndex, correctAnswered, answered } = this.state
        const currentCard = cards[cardIndex]

        if (cards.length === 0){
            return this.noCards()
        }

        return (
            <View style={styles.cardTable}>
                <Text style={styles.title}>
                    {`Correct answers: ${answered == 0 ? ' - ' : (correctAnswered / answered * 100).toFixed(1)}%`}
                </Text>
                <AnimatedCard ref={this.child}>
                    <CardTile question={currentCard.question} answer={currentCard.answer} faceUp={false} style={{width: 220}}/>
                    <CardTile question={currentCard.question} answer={currentCard.answer} faceUp={true} style={{width: 220}}/>
                </AnimatedCard>
                <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
                    <TextButton onPress={() => this.onAnswer(true)} style={[styles.textButton, { backgroundColor: '#98FB98' }]}>I Knew It</TextButton>
                    <TextButton onPress={() => this.onAnswer(false)} style={[styles.textButton, { backgroundColor: '#ff7777' }]}>I Was Wrong</TextButton>
                </View>

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