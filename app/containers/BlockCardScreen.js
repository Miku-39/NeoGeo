import React, { Component } from 'react'
import { View,
  DatePickerAndroid,
  DatePickerIOS,
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

import BlockCardEditor from '../components/BlockCardEditor'
import Loader from '../components/Loader'

import * as selectors from '../middleware/redux/selectors'
import { add, addFile, dismiss } from '../middleware/redux/actions/Ticket'
import { getSession } from '../middleware/redux/selectors'
import { storeCredentials, loadCredentials } from '../middleware/utils/AsyncStorage'

const headerButtonsHandler = { save: () => null }

@connect(
    store => ({
        employeeId: selectors.getEmployeeId(store),
        companyId: selectors.getCompanyId(store),
        isAdding: selectors.getIsTicketAdding(store),
        fileIsAdding: selectors.getIsFileAdding(store),
        added: selectors.getIsTicketAdded(store),
        fileAdded: selectors.getIsFileAdded(store),
        fileId: selectors.getFileId(store),
        error: selectors.getIsTicketAddingFailed(store),
        session: getSession(store)
    }),
    dispatch => ({
        addTicket: (ticket) => dispatch(add(ticket)),
        addFile: (file) => dispatch(addFile(file)),
        dismiss: () => dispatch(dismiss())
    })
)

export default class BlockCardScreen extends Component {
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
        const { employeeId, companyId, session } = this.props

        const ticket = {
            visitorFullName: '',
            actualCreationDate: new Date(),
            visitDate: new Date(),
            author: employeeId,
            visitDate: new Date(),
            status: '4285215000',
            type: '3695418000000',
        }

        this.setState({ticket: ticket, session: session, fieldsHighlights: {}})
    }

    componentDidMount() {
        headerButtonsHandler.save = this.save
    }

    componentWillReceiveProps(newProps) {
      const { added, error, fileAdded, fileId } = newProps
      const { goBack } = this.props.navigation

      if (added){
          Alert.alert( 'Заявка добавлена успешно', '',
          [{text: 'Закрыть', onPress: () => { goBack() }}])
          this.props.dismiss()
      }

      if (error) {
          console.log(error)
          Alert.alert( 'Ошибка', 'При сохранении возникла ошибка.',
          [{text: 'Закрыть', onPress: () => { }}])
      }

      if (fileAdded){
          this.addFileId(fileId, this.file)
          Alert.alert( 'Файл добавлен успешно')
      }
    }

    save = () => {
        const { ticket } = this.state

        var date = new Date(ticket.visitDate)
        ticket.visitDate = dateFormat(date, 'yyyy-mm-dd') + 'T00:00:00.000Z'

        var fieldsHighlights = {
          visitorFullName: !ticket.visitorFullName,
          blockReason: !ticket.blockReason
        }

        Keyboard.dismiss()
        var passed = true;
        for (var i in fieldsHighlights) {
            if (fieldsHighlights[i] === true) {
                passed = false;
                break;
            }}

        console.log(ticket)
        if(passed){
          this.props.addTicket(ticket)
        }else{
          Alert.alert('Не заполнены обязательные поля')
        }

        LayoutAnimation.easeInEaseOut();
        this.setState({'fieldsHighlights': fieldsHighlights})

    }

    saveFile = (file, name) => {
        this.file = name
        this.props.addFile(file)
    }

    addFileId = (fileId, name) => {
      const { ticket } = this.state
      ticket[name]= fileId
      this.setState({ticket})
    }

    updateField = (data, field) => {
      const { ticket } = this.state
      ticket[field] = data == '' ? null : data
      this.setState({ticket})
    }

    render = () => {
        const { ticket, session} = this.state
        const { isAdding, fileIsAdding } = this.props
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
        const carParkings = session.carParkings.sort((first, second) => {
          return first.name > second.name ? 1 : -1
        })
        return (
            <Loader message='Сохранение' isLoading={isAdding || fileIsAdding}>
                <BlockCardEditor
                    ticket={ticket}
                    updateField={this.updateField}
                    saveFile={this.saveFile}
                    fieldsHighlights={this.state.fieldsHighlights}
                    services={session.services}
                    blockReasons={session.blockReasons}
                    carParkings={carParkings}
                />
            </Loader>
        )
    }
}
