import React, { Component } from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { SwipeListView } from 'react-native-swipe-list-view'
  
import { Images, Colors } from '../theme'

const extractKey = ({id}) => id

export default class TicketsList extends Component {

    _handleGotIn = (rowData) => {
        const { item } = rowData
        this.props.handleGotIn(item)
    }

    _handleGotOut = (rowData) => {
        const { item } = rowData
        this.props.handleGotOut(item)
    }

    _handleSwipeBack = (rowKey, rowMap) => {
        setTimeout(() => {
            if (rowMap[rowKey])
                rowMap[rowKey].closeRow()
        }, 2000)
    }

    _renderItem = (rowData, rowMap) => {
        const { item } = rowData
        return (
            <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                <View style={{width: 5, marginTop: 8, marginBottom: 10, backgroundColor: 'green', borderRadius: 5}}></View>
                <View style={{flexDirection: 'column', marginLeft: 8, marginTop: 2, marginBottom: 8}}>
                    <Text style={{fontSize: 16, color: 'black'}}>{ item.visitorFullName }</Text>
                    {
                        item.carModelText || item.carNumber ?
                            <Text style={{fontSize: 12, color: '#767878'}}>{ `${item.carModelText}   ${item.carNumber}` }</Text> :
                            null
                    }
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 10, color: 'green', fontStyle: 'italic', marginRight: 5}}>{ item.status ? item.status.name : '' }</Text>
                        <Text style={{fontSize: 10, color: '#767878', fontStyle: 'italic'}}>
                            { `№ ${item.number} ${item.visitDate ? 'от' + item.visitDate.split('T')[0] : ''}` }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    _renderHeddenItem = (rowData, rowMap) => {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity style={{backgroundColor: 'green', width: 70, margin: 1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => this._handleGotIn(rowData)}
                >
                    <MaterialIcons name='arrow-downward' size={25} color='white' />
                    <Text style={{color: 'white'}} >Прибыл</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'red', width: 70, margin: 1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => this._handleGotOut(rowData)}
                >
                    <MaterialIcons name='arrow-upward' size={25} color='white' />
                    <Text style={{color: 'white'}} >Убыл</Text>
                </TouchableOpacity>   
            </View>
        )
    }

    render() {
        return (
            <SwipeListView
                initialListSize={10}
                useFlatList={true}
                data={this.props.items}
                renderItem={this._renderItem}
                renderHiddenItem={this._renderHeddenItem}
                leftOpenValue={0}
                rightOpenValue={-150}
                onRowOpen={this._handleSwipeBack}
                keyExtractor={extractKey}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'stretch', 
        width: '100%', 
        height: '100%', 
        backgroundColor: Colors.backgroundColor
    },
    rowBack: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    }
})