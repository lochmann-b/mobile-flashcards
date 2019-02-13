import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Home from './components/Home'
import Settings from './components/Settings'
import reducer from './reducers'

const Tabs = createBottomTabNavigator({
  Home: Home,
  Settings: Settings
})


export default class App extends React.Component {
  render() {
    const TabsContainer = createAppContainer(Tabs)
    return (
      <Provider store={createStore(reducer)}>
        <TabsContainer />
      </Provider>
    )
  }
}
