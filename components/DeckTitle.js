import React from 'react'
import { View, TextInput, Button } from 'react-native'

const DeckTitle = (props) => {
    const { value, onTextChanged, onSubmit, buttonText = 'Done' } = props
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput placeholder='Enter Deck Title' value={value} onChangeText={txt => onTextChanged(txt)} style={{ flex: 1, borderWidth: 1, borderColor: '#ffffff', borderRadius: 5, padding: 5, margin: 5, color: '#ffffff' }} />
            <Button title={buttonText} onPress={onSubmit} style={{ width: 80 }} />
        </View>
    )
}

export default DeckTitle