import React, { Component } from 'react'
import { View, StatusBar, Alert, TouchableOpacity, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'
import { connect } from 'react-redux'

import TicketsList from '../components/TicketsList'
import { Metrics } from '../theme'
import { fetch } from '../middleware/redux/actions/Tickets'
import { update, dismiss } from '../middleware/redux/actions/Ticket'
import { getTickets, getTicket } from '../middleware/redux/selectors'
import Loader from '../components/Loader'

const headerButtonsHandler = { 
    search: () => null
}
const CAME_STATUS_ID = '421575460000'
const WENT_STATUS_ID = '421575453000'

@connect(
    store => ({
        tickets: getTickets(store),
        ticket: getTicket(store)
    }),
    { fetch, update, dismiss }
)
export default class CheckpointScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return ({ 
            title: 'КПП',
            headerRight: (
                <TouchableOpacity style={{marginRight: 10}} onPress={() => headerButtonsHandler.search()}>
                    <MaterialIcons name='search' size={25} color='white' />
                </TouchableOpacity>
            )
        })
    }

    state = {
        items: [],
        filter: null,
        searchBarIsShown: false
      }

    componentDidMount () {
        headerButtonsHandler.search = this._handleShowSearchBarClick
        this.props.fetch()
        //this.swipeButtons = [{ text: 'first', text: 'second' }]
    }

    componentWillReceiveProps (nextProps) {
        const { items } = nextProps.tickets
        this.setState({items})

        const { updated } = nextProps.ticket
        if (updated) {
            Alert.alert( 'Внимание', 'Статус заявки успешно изменен', [ 
                {text: 'Закрыть', onPress: () => { this.props.dismiss() }} 
            ])
        }
    }

    _handleShowSearchBarClick = () => {
        const { searchBarIsShown } = this.state
        if (!searchBarIsShown)
          this.setState({searchBarIsShown: true})
    }
    
    _handleHideSearchBarClick = () => {
        this.setState({searchBarIsShown: false})
        Keyboard.dismiss()    
    }
    
    _handleSearchTextChanged = (text) => {
        const { items } = this.props.tickets 
        const filter = text.toLowerCase()

        const filtered = filter ? 
            items.filter((item) => { 
                return item.carModelText && item.carModelText.toLowerCase().includes(filter) || 
                    item.carNumber && item.carNumber.toLowerCase().includes(filter) ||
                    item.visitorFullName && item.visitorFullName.toLowerCase().includes(filter)
            })
            : items

        this.setState({items: filtered, filter})
    }

    _handleGotIn = (item) => {
        item.status = { id: CAME_STATUS_ID }
        this.props.update(item)
    }

    _handleGotOut = (item) => {
        item.status = { id: WENT_STATUS_ID }
        this.props.update(item)
    }

    render() {
        const { items, searchBarIsShown } = this.state
        const { isFetching } = this.props.tickets
        
        return (
            <View>
                {
                    searchBarIsShown && 
                    <SearchBar
                        lightTheme
                        clearIcon={{color: '#86939e', name: 'close'}}
                        inputStyle={{backgroundColor: 'white', fontSize: 16}}
                        containerStyle={{backgroundColor: '#627ab4', height: Metrics.navBarHeight, width: '100%', marginTop: -1}}
                        onChangeText={this._handleSearchTextChanged}
                        onClearText={this._handleHideSearchBarClick}
                        placeholder='Введите что-нибудь...' />
                }
            
                <Loader isLoading={isFetching}>
                    <TicketsList 
                        items={items}
                        handleGotIn={this._handleGotIn}
                        handleGotOut={this._handleGotOut} />
                </Loader>
            </View>
        )
    }
}