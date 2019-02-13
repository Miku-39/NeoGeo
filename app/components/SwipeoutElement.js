import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'


export default class SwipeoutElement extends React.PureComponent {
    handleAction = () => this.props.handleAction(this.props.item)

    render() {
        const { item } = this.props
        return (
            <View style={{width: '100%', height: '100%', marginTop: 1}}>
                <TouchableOpacity onPress={this.handleAction} style={{backgroundColor: '#941b1b', height: '100%', width: 79, justifyContent: 'center', alignItems: 'center', borderRadius: 7, marginRight: 1}}>
                    <MaterialIcons name={item.status.id === '421575460000' ? 'arrow-back' : 'arrow-forward'} size={20} color={'white'} />
                    <Text style={{color: 'white'}}>{item.status.id === '421575460000' ? 'Убыл' : 'Прибыл'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}