import React from 'react'
import { View, Text, Button, Alert, TouchableHighlight, YellowBox, StyleSheet } from 'react-native'
import { Images, Colors } from '../theme'
import Icon from 'react-native-vector-icons/MaterialIcons'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class TicketsListItem extends React.PureComponent {
    render() {
      const {item} = this.props

          const showAlert = () => {
          Alert.alert(
            "Информация",
            `${item.carModelText && 'Машина: ' + item.carModelText + ' ' + item.carNumber || 'Авто не указано'}` + "\n"
            + 'Водитель: ' + item.visitorFullName + "\n"
            + 'Груз: ' + item.materialValuesData + "\n"
            + `${item.materialValuesSize == null ? '' : 'Габариты груза: '+ item.materialValuesSize}`
            + 'Лифт: ' + `${item.lift && item.lift ? 'да' : 'нет'}`
            + `${item.rejectionReason && ('\n' + 'Причина отклонения: ' + item.rejectionReason) || ''}`,
           )}

           const header = () => {
             if(item.visitDate){
               if(item.parking){
                 if(item.parking.id == '3714666676000' || item.parking.name == 'Постоянные ТС'){
                   arrivalDate = ' ' }else{ arrivalDate = item.visitDate.substr(0,10) }
               }else{ arrivalDate = item.visitDate.substr(0,10) }
             }

             return(
               <View style={{flexDirection: 'row'}}>
                 <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic', marginRight: 5}}>
                 { item.type ? item.type.shortName : 'тип не указан' }
                 </Text>
                 <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic', marginRight: 5}}>
                 { arrivalDate }
                 </Text>
                 {(item.type.shortName == 'Внос' || item.type.shortName == 'Внос' || item.rejectionReason != null) &&
                 <Icon
                  name='receipt'
                  color='#941b1b'/>
                 }
               </View>
             )
           }

           const ticketInfo = () => {
             return(
               <View style={{flexDirection: 'row', marginBottom: 5, marginTop: 5}}>
                   <Text style={{fontSize: 11, color: status2colors[item.status && item.status.id], fontStyle: 'italic', marginRight: 5}}>
                   { item.status ? item.status.name : '' }
                   </Text>
                   <Text style={{fontSize: 11, color: '#767878', fontStyle: 'italic'}}>
                   { `№ ${item.number} ${item.visitDate ? 'от ' + item.visitDate.split('T')[0] : ''}` }
                   </Text>
               </View>
             )
           }
           switch(item.type.shortName){
             case 'Внос' || 'Вынос':
             return (
                      <View style={{width: '100%'}}>
                      <TouchableHighlight onPress={showAlert} underlayColor="#909090">
                      <View style={{flexDirection: 'row', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                      <View style={{width: 6, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                      <View style={{flexDirection: 'column', marginLeft: 8, marginBottom: 1 }}>

                      {header()}

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, color: 'black'}}>{item.carModelText && item.carModelText + ' ' + item.carNumber || 'Авто не указано'}</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, color: '#767878'}}>{(item.parking ? item.parking.name : 'Парковка не указана')}</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}}>{' ' + (item.parkingPlace && item.parkingPlace || '')}</Text>
                      </View>

                      {ticketInfo()}

                      </View>
                      </View>
                      </TouchableHighlight>
                      </View>
                  )
                  break;

                  case 'Гость':
                  return (
                    <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                    <View style={{width: 6, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                      <View style={{flexDirection: 'column', marginLeft: 8, marginBottom: 1 }}>

                      {header()}

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, color: 'black'}}>{item.visitorFullName && item.visitorFullName ||  'ФИО не указано'}</Text>
                      </View>

                      {ticketInfo()}

                      </View>
                    </View>
                  )
                  break;

                  case 'Авто':
                  return (
                    <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                    <View style={{width: 6, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                      <View style={{flexDirection: 'column', marginLeft: 8, marginBottom: 1 }}>

                      {header()}

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, color: 'black'}}>{item.carNumber + ' ' + item.carModelText}</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, color: '#767878'}}>{(item.parking ? item.parking.name : 'Парковка не указана')}</Text>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000000'}}>{' ' + (item.parkingPlace && item.parkingPlace || '')}</Text>
                      </View>

                      {ticketInfo()}

                      </View>
                    </View>
                  )
                  break;

                  default:
                  return(null);
                  break;
           }
}
}

const status2colors = {
    null: '#000000',
    '12884953000': '#008000',  // Принята
    '421575460000': '#214dde', // На территории
    '421575453000': '#008000', // Выполнена
    '421575459000': '#d12424', // Отклонена
    '4285215000': '#fd9419',   // Создана
    '2804833189000': '#d12424',// Повторная
    '4285216000': '#808080',   // Закрыта
    '3367462500000': '#fd9419', //Согласовано УК
    '2804833187000': '#000099' //Выдан пропуск
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
