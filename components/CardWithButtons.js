import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import TextButton from './TextButton'
import styles from '../styles'

const CardWithButtons = (props) => {
    const { children, buttonOptions, onPress } = props
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={onPress}>
                {children}
            </TouchableOpacity>
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
                {buttonOptions.map(buttonOption => (
                    <TextButton key={buttonOption.id} onPress={() => buttonOption.action()} style={buttonOption.style}> {buttonOption.text}</TextButton>
                ))
                }
            </View>
        </View >
    )
}

export default CardWithButtons