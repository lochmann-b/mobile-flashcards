import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './components/Home'
import Settings from './components/Settings'
import reducer from './reducers'
import middleware from './middleware'
import { SafeAreaView } from 'react-native'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'
import Play from './components/Play'
import ManageCard from './components/ManageCard'
import EditDeck from './components/EditDeck'
import CreateDeck from './components/CreateDeck'
import ResetAll from './components/ResetAll';


const addMarginTop = (ToWrap) => {
  return class UpperCaseComponent extends React.Component {
    render() {
      return (
        <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
          <ToWrap {...this.props} />
        </SafeAreaView>
      )
    }
  }
}

const HomeStack = createStackNavigator(
  {
    Home: Home,
    Play: Play,
    CreateDeck: CreateDeck,
    EditCard: ManageCard,
    EditDeck: EditDeck,
  })

const Tabs = createBottomTabNavigator({
  Home: HomeStack,
  Settings: addMarginTop(Settings)
})


const ModalStack = createStackNavigator({
  HomeStack: Tabs,
  ResetAll: addMarginTop(ResetAll)
}, {
    mode: 'modal',
    headerMode: 'none'
  })

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    const TabsContainer = createAppContainer(ModalStack)
    return (
      <Provider store={createStore(reducer, middleware)}>
        <TabsContainer />
      </Provider>
    )
  }
}
