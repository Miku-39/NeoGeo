import React, { Component } from 'react'
import { View, Text, Alert, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import MainComponent from '../components/MainComponent'

export default class MainScreenContainer extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Заявки'
        })
    }

    render = () => {
        const { navigate } = this.props.navigation
        return (

          <MainComponent
              addVisitTicket={() => navigate('Visitor', {ticketType: 'VISITOR'})}
              addCarTicket={() => navigate('Visitor', {ticketType: 'CAR'})}
              addCardTicket={() => navigate('Service', {ticketType: 'CARD'})}
              addGoodsInTicket={() => navigate('Goods', {ticketType: 'GOODSIN'})}
              addGoodsOutTicket={() => navigate('Goods', {ticketType: 'GOODSOUT'})}
              addServiceTicket={() => navigate('Service', {ticketType: 'SERVICE'})}
              addAltServiceTicket={() => navigate('Service', {ticketType: 'ALTSERVICE'})}
              addMakeCardTicket={() => navigate('MakeCard')}
              addBlockCardTicket={() => navigate('BlockCard')}
              openTickets={() => navigate('Tickets')}
          />
        )
    }
}
