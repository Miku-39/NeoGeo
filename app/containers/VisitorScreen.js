import React, { Component } from 'react'
import { View,
  Alert,
  TouchableOpacity,
  Text,
  NativeModules,
  LayoutAnimation,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import dateFormat from 'dateformat'
import VisitorTicketEditor from '../components/VisitorTicketEditor'
import Loader from '../components/Loader'
import * as selectors from '../middleware/redux/selectors'
import { add, addFile, dismiss } from '../middleware/redux/actions/Ticket'

import { getSession } from '../middleware/redux/selectors'
import { storeCredentials, loadCredentials } from '../middleware/utils/AsyncStorage'

const NEW_TICKET_STATUS_ID = '4285215000';
const VISITOR_TICKET_TYPE = '393629542000';
const CAR_TICKET_TYPE = '393629546000';

const headerButtonsHandler = { save: () => null }

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

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
        addFile: (file) => dispatch(addFile(file)),
        dismiss: () => dispatch(dismiss())
    })
)
export default class VisitorScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Новая заявка',
            headerRight: (
                <View style={{flexDirection: 'row', paddingRight: 7}}>
                    <TouchableOpacity onPress={() => headerButtonsHandler.save()}>
                      <Icon name='check' color='#FFF' size={30}/>
                    </TouchableOpacity>
                </View>
            ),
            headerLeft: (<Icon name='chevron-left' color='#FFF' size={40} onPress={ () => { navigation.goBack() } }/> )
        })
    }


    componentWillMount() {
        const { showCarFields, showGoodsFields, ticketType } = this.props.navigation.state.params
        const { employeeId, companyId, session } = this.props
        const nowDate = new Date();
        const ticket = {
            visitorFullName: '',
            carModelText: '',
            carNumber: '',
            actualCreationDate: nowDate,
            visitDate: nowDate,
            author: employeeId,
            parkingType: ticketType == 'CAR' ? '3590481191000' : null,
            status: NEW_TICKET_STATUS_ID,
            type: ticketType == 'CAR' ? CAR_TICKET_TYPE : VISITOR_TICKET_TYPE,
            client: companyId,
            nonstandardCarNumber: true,
            longTerm: false
        }
        const fieldsHighlights = {}

        this.setState({ticket: ticket, showCarFields: showCarFields,
           ticketType: ticketType, session: session, fieldsHighlights: fieldsHighlights})
    }

    componentDidMount() {
        headerButtonsHandler.save = this.save
    }

    componentWillReceiveProps(newProps) {
        const { added, error } = newProps
        const { goBack } = this.props.navigation

        if (added){
            Alert.alert( '', 'Добавлено успешно',
            [
                {text: 'Закрыть', onPress: () => { goBack() }}
            ])
            this.props.dismiss()
        }

        if (error) {
            console.log(error)
            Alert.alert( 'Ошибка', 'При сохранении заявки возникла ошибка',
            [
                {text: 'Закрыть', onPress: () => { }}
            ])
        }
    }

    save = () => {
        const { ticket } = this.state
        const { ticketType } = this.props.navigation.state.params

        var date = new Date(ticket.visitDate)
        ticket.visitDate = dateFormat(date, 'yyyy-mm-dd') + 'T00:00:00.000Z'

        var fieldsHighlights = {
          expirationDate: (ticket.longTerm && !ticket.expirationDate),
          visitorFullName: (!ticket.visitorFullName && ticketType == 'VISITOR'),
          parking: (ticketType == 'CAR' && !ticket.parking),
          carModelText: (ticketType == 'CAR' && !ticket.carModelText),
          carNumber: (ticketType == 'CAR' && !ticket.carNumber),
          time: ((ticket.parking == '3588462098000') && !ticket.time),
          hour: ((ticket.parking == '3588462098000') && !ticket.hour)
        }

        var passed = true;
        for (var i in fieldsHighlights) {
            if (fieldsHighlights[i] === true) {
                passed = false;
                break;
            }}

        Keyboard.dismiss()

        if ((ticket.visitorFullName.match(/ /g) || []).length != 2 && ticketType == 'VISITOR') {
          fieldsHighlights.visitorFullName = true;
          Alert.alert( 'Внимание', 'Заполните поле ФИО по формату "Фамилия Имя Отчество"',
          [
              {text: 'Закрыть', onPress: () => { }}
          ])
        }else{

        if(passed){
          this.props.addTicket(ticket)
        }else{
          Alert.alert('Не заполнены обязательные поля')
        }}
        this.setState({'fieldsHighlights': fieldsHighlights})
        LayoutAnimation.easeInEaseOut();
    }

    saveFile = (file) => {
        this.props.addFile(file)
    }

    updateField = (data, field) => {
      const { ticket } = this.state
      if(field == 'longTerm'){
        ticket.expirationDate = null
      }
      ticket[field] = data === '' ? null : data
      this.setState({ticket})
    }

    updateLongTerm = check => {
        const { ticket } = this.state
        ticket.longTerm = check
        this.setState({ticket})
    }


    render = () => {
        const { ticket, ticketType, session} = this.state
        const { isAdding } = this.props
        const times = [
          { name: "0",  id: "3592360180000" },
          { name: "5",  id: "3592360188000" },
          { name: "10", id: "3592360191000" },
          { name: "15", id: "3592360193000" },
          { name: "20", id: "3685658805000" },
          { name: "25", id: "3685658809000" },
          { name: "30", id: "3685658810000" },
          { name: "35", id: "3685658815000" },
          { name: "40", id: "3685658816000" },
          { name: "45", id: "3685658818000" },
          { name: "50", id: "3685658820000" },
          { name: "55", id: "3685658822000" },
        ]
        const hours = [
          { name: '0', id: '3756497547000' },
          { name: '1', id: '3756497635000' },
          { name: '2', id: '3756497718000' },
          { name: '3', id: '3756497794000' },
          { name: '4', id: '3756497896000' },
          { name: '5', id: '3756497978000' },
          { name: '6', id: '3756498054000' },
          { name: '7', id: '3756498123000' },
          { name: '8', id: '3685659141000' },
          { name: '9', id: '3685659153000' },
          { name: '10', id: '3685659166000' },
          { name: '11', id: '3685659176000' },
          { name: '12', id: '3685659178000' },
          { name: '13', id: '3685659182000' },
          { name: '14', id: '3685659186000' },
          { name: '15', id: '3685659187000' },
          { name: '16', id: '3685659190000' },
          { name: '17', id: '3685659195000' },
          { name: '18', id: '3685659196000' },
          { name: '19', id: '3756496748000' },
          { name: '20', id: '3756497113000' },
          { name: '21', id: '3756497222000' },
          { name: '22', id: '3756497325000' },
          { name: '23', id: '3756497446000' }
        ]
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
        carParkings = session.carParkings.sort((first, second) => {
          return first.name > second.name ? 1 : -1
        })
        return (
            <Loader message='Сохранение' isLoading={isAdding}>
                <VisitorTicketEditor
                    ticket={ticket}
                    updateLongTerm={this.updateLongTerm}
                    updateField={this.updateField}
                    saveFile={this.saveFile}
                    fieldsHighlights={this.state.fieldsHighlights}
                    ticketType={ticketType}

                    times={times}
                    hours={hours}
                    carParkings={carParkings}
                    services={session.services}
                />
            </Loader>
        )
    }
}
