import React, { Component } from 'react'
import {
  Platform,
  StyleSheet
} from 'react-native'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'

import store from './middleware/redux'
import LoginScreen from './containers/LoginScreen'
import CheckpointScreen from './containers/CheckpointScreen'
//import BillScreen from './containers/BillScreen'
//import DocumentScreen from './containers/DocumentScreen'

import api from './middleware/api'
import { Metrics } from './theme'


const styles = StyleSheet.create({
  back: { 
    backgroundColor: '#627ab4'
  }, 
  title: { color: 'white' }
})

const Navigation = StackNavigator({
  Login: { screen: LoginScreen, navigationOptions: { header: null } }, 
  Checkpoint: { screen: CheckpointScreen },
  //Bill: { screen: BillScreen },
  //Document: { screen: DocumentScreen }
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: styles.back,
    headerTitleStyle: styles.title,
    headerTintColor: 'white'
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

