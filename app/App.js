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
import MainScreen from './containers/MainScreen'
import TicketScreen from './containers/TicketScreen'
import TicketsScreen from './containers/TicketsScreen'


import api from './middleware/api'
import { Metrics } from './theme'


const styles = StyleSheet.create({
    back: { 
        backgroundColor: '#941b1b'
    }, 
    title: { color: 'white' }
})

const Navigation = StackNavigator({
    Login: { screen: LoginScreen, navigationOptions: { header: null } }, 
    Checkpoint: { screen: CheckpointScreen },
    Main: { screen: MainScreen },
    Ticket: { screen: TicketScreen },
    Tickets: { screen: TicketsScreen },
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

