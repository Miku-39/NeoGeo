import React, { Component } from 'react'
import { View, Text, Alert, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import MainComponent from '../components/MainComponent'

export default class MainScreenContainer extends Component {
    static navigationOptions = ({navigation}) => {
        return ({ 
            title: 'Кларис'
        })
    }

    render = () => {
        const { navigate } = this.props.navigation

        return (
            <View>
                <StatusBar barStyle='light-content' />
                <MainComponent
                    addVisitTicket={() => navigate('Ticket', { showCarFields: false })}
                    addCarTicket={() => navigate('Ticket', { showCarFields: true })}
                    openTickets={() => navigate('Tickets')}
                    openEvents={() => Alert.alert( 'Внимание', 'Функционал событий находится на стадии разработки', [ {text: 'Закрыть', onPress: () => { }} ])}
                />
            </View>
        )
    }
}