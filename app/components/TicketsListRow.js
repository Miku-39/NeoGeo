import React from 'react'
import { View, Text } from 'react-native'

export default class TicketsListRow extends React.PureComponent {
    render() {
        const { item } = this.props
        return (
            <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                <View style={{width: 6, marginTop: 8, marginBottom: 10, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                <View style={{flexDirection: 'column', marginLeft: 8, marginTop: 2, marginBottom: 8}}>
                    <Text style={{fontSize: 18, color: 'black', marginTop: 5}}>{ `${item.carNumber}   ${item.carModelText}` }</Text>
                    <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 5}}>
                        <Text style={{fontSize: 11, color: status2colors[item.status && item.status.id], fontStyle: 'italic', marginRight: 5}}>{ item.status ? item.status.name : '' }</Text>
                        <Text style={{fontSize: 11, color: '#767878', fontStyle: 'italic'}}>
                            { `№ ${item.number} ${item.visitDate ? 'от' + item.visitDate.split('T')[0] : ''}` }
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const status2colors = {
    null: 'gray',
    '12884953000': '#00FFFF',//Принята
    '421575460000': '#FF99CC',//На территор...
    '3415745337000': '#008000',//Выполнена
    '421575459000': '#993366',//Отклонена
    '4285215000': '#CCFFFF',//Создана
    '2804833189000': '#FF0000',//Повторная
    '4285216000': '#808080',//Закрыта
}