import React, { Component } from 'react'
import { View,
  DatePickerAndroid,
  DatePickerIOS,
  Alert,
  TouchableOpacity,
  Text
} from 'react-native'
import { connect } from 'react-redux'

import ServiceTicketEditor from '../components/ServiceTicketEditor'
import Loader from '../components/Loader'
import * as selectors from '../middleware/redux/selectors'
import { add, dismiss } from '../middleware/redux/actions/Ticket'

import { getSession } from '../middleware/redux/selectors'
import { storeCredentials, loadCredentials } from '../middleware/utils/AsyncStorage'

const NEW_TICKET_STATUS_ID = '2237224236000';

const SERVICE_TICKET_TYPE = '3724900074000';

const headerButtonsHandler = { save: () => null }


@connect(
    store => ({
        employeeId: selectors.getEmployeeId(store),
        companyId: selectors.getCompanyId(store),
        isAdding: selectors.getIsTicketAdding(store),
        added: selectors.getIsTicketAdded(store),
        error: selectors.getIsTicketAddingFailed(store),
        session: getSession(store)
    }),
    dispatch => ({
        addTicket: (ticket) => dispatch(add(ticket)),
        dismiss: () => dispatch(dismiss())
    })
)

export default class ServiceScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Сервисная заявка',
            headerRight: (
                <View style={{flexDirection: 'row', paddingRight: 7}}>
                    <TouchableOpacity onPress={() => headerButtonsHandler.save()}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>Сохранить</Text>
                    </TouchableOpacity>
                </View>
            )
        })
    }


    componentWillMount() {
        const { showCarFields, showGoodsFields, ticketType } = this.props.navigation.state.params
        const { employeeId, companyId, session } = this.props

        const ticket = {
            actualCreationDate: new Date(),
            visitDate: new Date(),
            author: employeeId,
            status: NEW_TICKET_STATUS_ID,
            type: SERVICE_TICKET_TYPE,
            client: companyId,
            isCommonAreas: false
        }

        this.setState({ticket: ticket,
           ticketType: ticketType, session: session})
    }

    componentDidMount() {
        headerButtonsHandler.save = this.save
    }

    componentWillReceiveProps(newProps) {
        const { added, error } = newProps
        const { goBack } = this.props.navigation

        if (added){
            Alert.alert( '', 'Заявка добавлена успешно',
            [{text: 'Закрыть', onPress: () => { goBack() }}])
            this.props.dismiss()
        }

        if (error) {
            Alert.alert( 'Ошибка', 'При сохранении заявки возникла ошибка.',
            [{text: 'Закрыть', onPress: () => { }}])
        }
    }

    save = () => {
        const { ticket } = this.state
        const { ticketType } = this.props.navigation.state.params
        this.props.addTicket(ticket)
    }

    updateService = (name, id) => {
        const { ticket } = this.state
        ticket.service = id
        console.log(ticket)
        this.setState({ticket})
    }
    updateMOP = check => {
        const { ticket } = this.state
        ticket.room = check ? null : ticket.room
        ticket.isCommonAreas = check
        console.log(ticket)
        this.setState({ticket})
    }
    updateRoom = room => {
      const { ticket } = this.state
      ticket.room = room
      console.log(ticket)
      this.setState({ticket})
    }

    updateWhatHappened = text => {
      const { ticket } = this.state
      ticket.whatHappened = text
      console.log(ticket)
      this.setState({ticket})
    }

    render = () => {
        const { ticket, ticketType, session} = this.state
        const { isAdding } = this.props

        return (
            <Loader message='Сохранение' isLoading={isAdding}>
                <ServiceTicketEditor
                    ticket={ticket}
                    updateService={this.updateService}
                    updateMOP={this.updateMOP}
                    updateRoom={this.updateRoom}
                    updateWhatHappened={this.updateWhatHappened}

                    ticketType={ticketType}

                    initialService={session.services[0].name}
                    services={session.services}

                />
            </Loader>
        )
    }
}
