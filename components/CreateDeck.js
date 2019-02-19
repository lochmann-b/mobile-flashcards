import React, { Component } from 'react';
import DeckTitle from './DeckTitle'
import { View } from 'react-native'
import styles from '../styles';

class CreateDeck extends Component {

    state = {
        deckTitle: ''
    }

    static navigationOptions = {
        title: 'Create Deck'
    }

    onTextChanged = deckTitle => {
        this.setState({
            deckTitle
        })
    }

    handleUpdate = () => {
        const { navigation } = this.props
        const onAddDeck = navigation.getParam('onAddDeck')
        const { deckTitle } = this.state

        onAddDeck(deckTitle)
            .then(() => navigation.goBack())
    }

    render() {
        const { deckTitle } = this.state
        return (
            <View style={styles.form}>
                <DeckTitle
                    value={deckTitle}
                    onTextChanged={this.onTextChanged}
                    onSubmit={this.handleUpdate}                   
                />
            </View>
        )
    }
}

export default CreateDeck;