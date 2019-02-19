import React from 'react'
import { View, TextInput, Button } from 'react-native'
import styles from '../styles';

const DeckTitle = (props) => {
    const { value, onTextChanged, onSubmit, buttonText = 'Done' } = props
    return (
        <View style={{ flexDirection: 'row',  alignItems: 'center'}}>
            <TextInput placeholder='Enter Deck Title' value={value} onChangeText={txt => onTextChanged(txt)} style={styles.input} />
            <Button title={buttonText} onPress={onSubmit} />
        </View>
    )
}

export default DeckTitle