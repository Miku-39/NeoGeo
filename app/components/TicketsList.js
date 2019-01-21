import React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

import { Images, Colors } from '../theme'


const extractKey = ({id}) => id
const status2colors = {
    null: 'gray',
    '12884953000': '#008000',//Принята
    '421575460000': '#214dde',//На территор...
    '421575453000': '#008000',//Выполнена
    '421575459000': '#d12424',//Отклонена
    '4285215000': '#fd9419',//Создана
    '2804833189000': '#d12424',//Повторная
    '4285216000': '#808080',//Закрыта
}

export default class TicketsList extends React.PureComponent {
    renderItem = ({item}) => {
        return (
            <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                <View style={{width: 5, marginTop: 8, marginBottom: 10, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                <View style={{flexDirection: 'column', marginLeft: 8, marginTop: 4, marginBottom: 10}}>
                    <Text style={{fontSize: 22, color: 'black', marginBottom: 5}}>
                        { item.visitorFullName || 'ФИО не указано' }
                    </Text>

                    {
                        (item.carModelText || item.carNumber) ?
                            <Text style={{fontSize: 20, color: '#767878', marginBottom: 5}}>
                                { `${item.carNumber}   ${item.carModelText}` }
                            </Text>
                            : null
                    }

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, color: status2colors[item.status && item.status.id], fontStyle: 'italic', marginRight: 5}}>
                            { item.status ? item.status.name : '' }
                        </Text>
                        <Text style={{fontSize: 16, color: '#767878', fontStyle: 'italic'}}>
                            { `№ ${item.number} ${item.visitDate ? 'от ' + item.visitDate.split('T')[0] : ''}` }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <FlatList
                style={{flex: 1, backgroundColor: Colors.backgroundColor}}
                data={this.props.items}
                renderItem={this.renderItem}
                keyExtractor={extractKey} />

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
