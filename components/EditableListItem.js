import React from 'react'
import { View } from 'react-native'
import TextButton from './TextButton'
import styles from '../styles'

const EditableListItem = (props) => {
    const { onEdit, onDelete, children } = props
    return (
        <View>
            {children}
            <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
                <TextButton onPress={() => onEdit()} style={styles.editButton}> Edit</TextButton>
                <TextButton onPress={() => onDelete()} style={styles.deleteButton}>Delete</TextButton>
            </View>
        </View>
    )
}

export default EditableListItem