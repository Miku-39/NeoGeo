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
          <MainComponent
              addVisitTicket={() => navigate('Ticket', {showCarFields: false, showGoodsFields: false, showServiceFields: false, ticketType: 'VISITOR'})}
              addCarTicket={() => navigate('Ticket', {showCarFields: true, showGoodsFields: false, showServiceFields: false, ticketType: 'CAR'})}
              addGoodsArriveTicket={() => navigate('Ticket', {showCarFields: true, showGoodsFields: true, showServiceFields: false, ticketType: 'GOODS_ARRIVE'})}
              addGoodsLeaveTicket={() => navigate('Ticket', {showCarFields: true, showGoodsFields: true, showServiceFields: false, ticketType: 'GOODS_LEAVE'})}
              addServiceTicket={() => navigate('Ticket', {showCarFields: false, showGoodsFields: false, showServiceFields: true, ticketType: 'SERVICE'})}
              openTickets={() => navigate('Tickets')}
              openEvents={() => Alert.alert( 'Внимание', 'Функционал событий находится на стадии разработки', [ {text: 'Закрыть', onPress: () => { }} ])}
          />
        )
    }
}
