import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import {TouchableOpacity, Platform} from 'react-native'
import PropTypes from 'prop-types'

const AddButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
          <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} style={{paddingLeft:10, paddingRight: 10}}></Ionicons>
        </TouchableOpacity>
    )
}

AddButton.propTypes = {
  onPress: PropTypes.func
}


export default AddButton;