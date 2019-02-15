import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'


export default function TextButton({ children, onPress, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.textButton, style]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textButton: {
        textAlign: 'center',
    }
})