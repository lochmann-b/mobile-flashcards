import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton';
import { handleUpdateCard, handleAddCard } from '../actions/cards'

class ManageCard extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('cardId') ? 'Edit' : 'Add'} Card`,
        }
    }

    state = {
        question: this.props.card ? this.props.card.question : '',
        answer: this.props.card ? this.props.card.answer : '',
    }


    onTextChanged = (field, txt) => {
        this.setState({
            [field]: txt
        })
    }

    handleSubmit = () => {
        const { dispatchUpdateCard, dispatchAddCard, card, navigation } = this.props
        const { question, answer } = this.state

        const prom = card ? dispatchUpdateCard(card.id, question, answer) : dispatchAddCard(navigation.getParam('deckId'), question, answer)
        prom.then(() => {
            navigation.goBack()
        }).catch(e => {
            const message = `${card ? 'Could not update card' : 'could not add card'}`
            console.log(message, e)
            alert(message)
        })
    }

    render() {
        const { question, answer } = this.state

        return (
            <View>
                <Text>
                    Question
                </Text>
                <TextInput placeholder='Enter Question' value={question} onChangeText={txt => this.onTextChanged('question', txt)} />
                <Text>
                    Answer
                </Text>
                <TextInput placeholder='Enter Answer' name='answer' value={answer} onChangeText={txt => this.onTextChanged('answer', txt)} />
                <TextButton onPress={this.handleSubmit}> Done</TextButton>
            </View>
        );
    }
}

function mapStateToProps({ cards }, { navigation }) {
    const cardId = navigation.getParam('cardId');
    const card = cards[cardId];
    return {
        card: card
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchUpdateCard: (cardId, question, answer) => dispatch(handleUpdateCard(cardId, question, answer)),
        dispatchAddCard: (deckId, question, answer) => dispatch(handleAddCard(deckId, question, answer)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageCard);