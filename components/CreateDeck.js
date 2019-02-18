import React, { Component } from 'react';
import { Text, TextInput, View, Button} from 'react-native'

class CreateDeck extends Component {

    state = {
        deckTitle: ''
    }

    onTextChanged = deckTitle => {
        this.setState({
            deckTitle
        })
    }

    handleUpdate = () => {
        const { navigation } =  this.props
        const onAddDeck = navigation.getParam('onAddDeck')
        const  { deckTitle } = this.state
        
        onAddDeck(deckTitle)
        .then(() => navigation.goBack())
    }

    render() {
        const { deckTitle } = this.state
        return (
            <View>
                <Text>
                    Enter Deck Title
                </Text>
                <TextInput placeholder='Enter Deck Title' value={deckTitle} onChangeText={txt => this.onTextChanged(txt)} />
                <Button title='Done' onPress={this.handleUpdate}/>
            </View>
        );
    }
}

export default CreateDeck;