import React, { Component } from 'react'
import { View, StatusBar, Alert, TouchableOpacity, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'

import TicketsList from '../components/TicketsList'
import { Metrics } from '../theme'

const data = require('../middleware/api/fixtures/Tickets.json')
const headerButtonsHandler = { 
    search: () => null
}



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
        items: data,
        filter: null,
        searchBarIsShown: false
      }

    componentDidMount () {
        headerButtonsHandler.search = this._handleShowSearchBarClick
        //this.props.fetch()
        //this.swipeButtons = [{ text: 'first', text: 'second' }]
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
        this.setState({filter: text.toLowerCase()})
    }

    _handleCloseItem = item => {
        
        console.log('item', item)
    }
    
    
    //_ => rowMap[rowData.item.key].closeRow() 

    render() {
        const { items, filter, searchBarIsShown } = this.state
        fltrd = filter ? 
            items.filter((item) => { 
                return item.carModelText && item.carModelText.toLowerCase().includes(filter) || 
                    item.carNumber && item.carNumber.toLowerCase().includes(filter) ||
                    item.visitorFullName && item.visitorFullName.toLowerCase().includes(filter)
            })
            : items
        
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
            
                <TicketsList 
                    isLoading={false} 
                    items={fltrd}
                    handleCloseItem={this._handleCloseItem} />
            </View>
        )
    }
}