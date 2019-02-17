import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton';
import { handleUpdateCard } from '../actions/cards'

class EditCard extends Component {

    state= {
        question: this.props.card ? this.props.card.question : '',
        answer: this.props.card ? this.props.card.answer : '',
    }


    onTextChanged = (field, txt) => {
        this.setState({
            [field]: txt
        })
    }

    handleUpdate = () => {
        const { dispatch, card, navigation } = this.props
        const { question, answer } = this.state
        dispatch(handleUpdateCard(card.id, question, answer))
        .then(() => {
            navigation.goBack()
        })
        .catch(e => {
            console.log('Could not update card', e)
            alert('Could not update card')}
        )

    }
   
    render() {
        const { question, answer } = this.state

        return (
            <View>
                <Text>
                    Question
                </Text>
                <TextInput placeholder='Enter Question' value={question} onChangeText={ txt => this.onTextChanged('question', txt)}/>
                <Text>
                    Answer
                </Text>
                <TextInput placeholder='Enter Answer' name='answer' value={answer} onChangeText={ txt => this.onTextChanged('answer', txt)}/>
                <TextButton onPress={this.handleUpdate}> Done</TextButton>
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


export default connect(mapStateToProps)(EditCard);