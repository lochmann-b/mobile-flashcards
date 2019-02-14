import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBottomTabNavigator, createStackNavigator,createAppContainer } from 'react-navigation'
import Home from './components/Home'
import Settings from './components/Settings'
import reducer from './reducers'
import middleware from './middleware'

import Deck from './components/Deck'
import Play from './components/Play'
import DeleteDeck from './components/DeleteDeck'
import EditCard from './components/EditCard'
import EditDeck from './components/EditDeck'
import CreateDeck from './components/CreateDeck'
import DeleteCard from './components/DeleteCard'


const HomeStack= createStackNavigator(
  {
    Home: Home,
    Deck: Deck,
    Play: Play,
    DeleteDeck: DeleteDeck,
    DeleteCard: DeleteCard,
    CreateDeck: CreateDeck,
    EditCard: EditCard,
    EditDeck: EditDeck
  })


const Tabs = createBottomTabNavigator({
  Home: HomeStack,
  Settings: Settings
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
