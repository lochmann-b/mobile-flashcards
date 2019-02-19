import React, { Component } from 'react'
import { View, } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton';
import { reset } from '../utils/api' // TODO remove

export class Settings extends Component {
  render() {
    return (
      <View>
          <TextButton onPress={ () => reset()}>
            Reset Local Store
          </TextButton>
          
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
