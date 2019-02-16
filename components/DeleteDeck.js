import React, { Component } from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native'
import { Constants } from 'expo'

class DeleteDeck extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, marginTop:Constants.statusBarHeight }}>
                 <Text>Delete Card</Text>
            </SafeAreaView>
        );
    }
}

export default DeleteDeck;