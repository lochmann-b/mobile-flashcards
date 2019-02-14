import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from '../styles'
import TextButton from './TextButton';


class Deck extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: `Deck ${navigation.getParam('deckId')}`,
            headerRight: (
                <TouchableOpacity onPress={navigation.getParam('deleteDeck')}>
                    <Ionicons size={20} name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'} ></Ionicons>
                </TouchableOpacity>
            ),
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({deleteDeck: this.deleteDeck})
    }

    deleteDeck = () => {
        alert(`Delete deck with id ${this.props.navigation.getParam('deckId')}`)
    }

    render() {
        const { navigation } = this.props
        const deckId = navigation.getParam('deckId', 'NO-ID');
        
        return (
            <View>
                <TextButton onPress={ () => {navigation.navigate('Play')}}>
                    Deck {deckId}
                </TextButton>
            </View>
        )
    }
}

export default Deck;