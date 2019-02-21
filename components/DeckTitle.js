import React from 'react'
import { View, TextInput, Button } from 'react-native'
import styles from '../styles'
import PropTypes from 'prop-types'

const DeckTitle = (props) => {
    const { value, onTextChanged, onSubmit, buttonText = 'Done' } = props
    return (
        <View style={{ flexDirection: 'row',  alignItems: 'center'}}>
            <TextInput placeholder='Enter Deck Title' value={value} onChangeText={txt => onTextChanged(txt)} style={styles.input} />
            <Button title={buttonText} onPress={onSubmit} />
        </View>
    )
}

DeckTitle.propTypes = {
    value: PropTypes.string,
    onTextChanged: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string
}

export default DeckTitle