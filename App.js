import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './components/Home'
import Settings from './components/Settings'
import reducer from './reducers'
import middleware from './middleware'
import { StatusBar, View, SafeAreaView } from 'react-native'
import { Constants } from 'expo'

import Deck from './components/Deck'
import Play from './components/Play'
import DeleteDeck from './components/DeleteDeck'
import EditCard from './components/EditCard'
import EditDeck from './components/EditDeck'
import CreateDeck from './components/CreateDeck'
import DeleteCard from './components/DeleteCard'


const wrapStatusBar = (ToWrap) => {
  return class UpperCaseComponent extends React.Component {
    render() {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ backgroundColor: '#ff0f0f', height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor='#ff0f0f' {...this.props} />
            <ToWrap {...this.props} />
          </View>
        </SafeAreaView>

      )
    }
  }
}


const HomeStack = createStackNavigator(
  {
    Home: Home,
    Deck: Deck,
    Play: Play,
    DeleteCard: DeleteCard,
    CreateDeck: CreateDeck,
    EditCard: EditCard,
    EditDeck: EditDeck
  })

const ModalStack = createStackNavigator({
  HomeStack: HomeStack,
  DeleteDeck: DeleteDeck
}, {
    mode: 'modal',
    headerMode: 'none'
  })


const Tabs = createBottomTabNavigator({
  Home: ModalStack,
  Settings: wrapStatusBar(Settings)
})




export default class App extends React.Component {

  render() {
    const TabsContainer = createAppContainer(Tabs)
    return (
      <Provider store={createStore(reducer, middleware)}>
        <TabsContainer />
      </Provider>
    )
  }
}
