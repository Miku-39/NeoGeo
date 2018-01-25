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
import { LargeList } from 'react-native-largelist'

import { Images, Colors } from '../theme'


const extractKey = ({id}) => id

export default class TicketsList extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.items !== this.props.items)
            this.list.reloadData()
    }

    renderElement = (section, row) => {
        const item = this.props.items[row]
        return (
            <View style={{width: '100%', height: '100%', marginTop: 1}}>
                <Button
                    buttonStyle={{backgroundColor: '#627ab4'}}
                    color={'white'}
                    onPress={() => this.props.handleSwipeoutAction(item)}
                    title={item.status.id === '421575460000' ? 'Убыл' : 'Прибыл'} />
            </View>
        )
    }

    renderCell = (section, row) => {
        const item = this.props.items[row]
        return (
            <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                <View style={{width: 5, marginTop: 8, marginBottom: 10, backgroundColor: 'green', borderRadius: 5}}></View>
                <View style={{flexDirection: 'column', marginLeft: 8, marginTop: 2, marginBottom: 8}}>
                    <Text style={{fontSize: 16, color: 'black', marginTop: 5}}>{ `${item.carModelText}   ${item.carNumber}` }</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                        <Text style={{fontSize: 10, color: 'green', fontStyle: 'italic', marginRight: 5}}>{ item.status ? item.status.name : '' }</Text>
                        <Text style={{fontSize: 10, color: '#767878', fontStyle: 'italic'}}>
                            { `№ ${item.number} ${item.visitDate ? 'от' + item.visitDate.split('T')[0] : ''}` }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <LargeList
                style={{flex: 1}}
                bounces={true}
                ref={list => this.list = list}
                numberOfRowsInSection={() => this.props.items.length}
                renderCell={this.renderCell}
                heightForCell={() => 50}
                renderRightWhenSwipeOut={this.renderElement}
                widthForRightWhenSwipeOut={() => 150}
                colorForSwipeOutBgColor={() => 'white'}
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