import React, { Component } from 'react'
import { View } from 'react-native'
import { Colors } from '../theme'
import Ticket from '../components/Ticket'

const fieldsProperties = [
{
  type:               { name: 'Вид', type: 'list' },
  visitDate:          { name: 'Дата', type: 'date' },
  expirationDate:     { name: 'Действует до', type: 'date' }
}, {
  visitorFullName:    { name: 'ФИО посетителя', type: 'text' },
}, {
  whoMeets:           { name: 'ФИО встречающего', type: 'text' },
}, {
  carNumber:          { name: 'Номер авто', type: 'text' },
  carModelText:       { name: 'Модель авто', type: 'text' },
  parkingPlace:       { name: 'Место на парковке', type: 'text' },
  parking:            { name: 'Парковка', type: 'list' }
}, {
  companyName:        { name: 'Компания-поставщик', type: 'text' },
  materialValuesData: { name: 'Данные материальных ценностей', type: 'text' },
  lift:               { name: 'Лифт', type: 'flag' }
}, {
  whereHappened:      { name: 'Место', type: 'text' },
  whatHappened:       { name: 'Что сделать', type: 'text' }
}, {
  note:               { name: 'Примечание', type: 'text' },
  rejectionReason:    { name: 'Причина отклонения', type: 'text'}
}
]

export default class TicketScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const { ticket } = navigation.state.params
        return ({
            title: ticket.number + ' - ' + ticket.status.name
        })
    }

    render() {
      const {ticket, status2colors} = this.props.navigation.state.params
        return (
            <View style={{flex: 1}}>
                <Ticket ticket={ticket}
                        fieldsProperties={fieldsProperties}/>
            </View>
        )
    }
}
