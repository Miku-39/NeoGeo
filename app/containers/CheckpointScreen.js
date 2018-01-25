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
    refresh: () => null,
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
                <View style={{flexDirection: 'row', paddingRight: 7}}>
                    <TouchableOpacity onPress={() => headerButtonsHandler.refresh()}>
                        <MaterialIcons name='autorenew' size={25} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 7, marginRight: 10}} onPress={() => headerButtonsHandler.search()}>
                        <MaterialIcons name='search' size={25} color='white' />
                    </TouchableOpacity>
                </View>
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
        headerButtonsHandler.refresh = this._handleRefreshClick
        this.props.fetch()
    }

    componentWillReceiveProps (nextProps) {
        const { items } = nextProps.tickets
        this.setState({items})

        const { updated } = nextProps.ticket
        if (updated) {
            Alert.alert( 'Внимание', 'Статус заявки успешно изменен', [ 
                {text: 'Закрыть', onPress: () => { 
                    this.props.dismiss() 
                    this.props.fetch()
                }} 
            ])
        }
    }

    _handleRefreshClick = () => {
        this._handleHideSearchBarClick()
        this.props.fetch()
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
        const filter = text.toLowerCase()
        this.setState({filter})
    }

    handleChangeStatus = (item) => {
        if (item.status.id === '421575460000')
            item.status = { id: WENT_STATUS_ID }
        else item.status = { id: CAME_STATUS_ID }

        this.props.update(item)
    }

    render() {
        const { items, searchBarIsShown, filter } = this.state
        const { isFetching } = this.props.tickets
        

        const filtered = filter ? 
            items.filter((item) => item.carNumber && item.carNumber.toLowerCase().includes(filter))
            : items

        return (
            <View style={{flex: 1}}>
                {
                    searchBarIsShown && 
                    <SearchBar
                        lightTheme
                        clearIcon={{color: '#86939e', name: 'close'}}
                        inputStyle={{backgroundColor: 'white', fontSize: 16}}
                        containerStyle={{backgroundColor: '#627ab4', height: Metrics.navBarHeight, width: '100%', marginTop: -1}}
                        onChangeText={this._handleSearchTextChanged}
                        onClearText={this._handleHideSearchBarClick}
                        keyboardType='numeric'
                        placeholder='Введите что-нибудь...' />
                }
            
                <Loader isLoading={isFetching}>
                    <TicketsList 
                        items={filtered}
                        handleSwipeoutAction={this.handleChangeStatus} />
                </Loader>
            </View>
        )
    }
}