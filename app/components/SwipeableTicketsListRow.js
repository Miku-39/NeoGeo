import React from 'react'
import { View, Text, Button, Alert, TouchableHighlight, YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class TicketsListRow extends React.PureComponent {



    render() {
        const { item } = this.props
        let parking = item.parking ? item.parking.name : ' '
        if (item.parkingPlace)
            parking = parking + `, ${item.parkingPlace}`
            var materialSize= item.materialValuesSize == null ? '' : 'Габариты груза: '+ item.materialValuesSize + "/n";
            var message= 'Машина: ' + item.carNumber + ' ' + item.carModelText + "\n"
            + 'Водитель: ' + item.visitorFullName + "\n"
            + 'Груз: ' + item.materialValuesData + "\n"
            + materialSize
            + 'Арендатор: ' + `${item.company && item.company.name || ' '}`;

            const showAlert = () => {
            Alert.alert(
              "Информация о грузе",
              message,
             )}

             if(item.unloadingWithoutCar == true){var title = `${item.visitorFullName || ' '}`;}else{var title = `${item.carNumber || ' '}` + ' ' + `${item.carModelText || ' '}`;}


             if(item.type.shortName == "Внос" || item.type.shortName == "Вынос"){
               if(item.unloadingWithoutCar == true){var title = item.visitorFullName;}else{var title = item.carNumber + ' ' + item.carModelText;}
                  return (
                      <View style={{width: '100%'}}>
                      <TouchableHighlight onPress={showAlert} underlayColor="#909090">
                      <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                      <View style={{width: 6, marginBottom: 4, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                      <View style={{flexDirection: 'column', marginLeft: 8, marginBottom: 1 }}>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic', marginRight: 5}}>
                        { item.type ? item.type.shortName : 'тип не указан' }
                        </Text>
                        <Text style={{fontSize: 14, color: 'red', fontStyle: 'italic'}}>{`   ${item.company && item.company.name || ' '}`}</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, color: 'black'}}>{title}</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16, color: '#767878', marginTop: -3}}>{parking}</Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 11, color: status2colors[item.status && item.status.id], fontStyle: 'italic', marginRight: 5}}>
                          { item.status ? item.status.name : '' }
                          </Text>

                          <Text style={{fontSize: 11, color: '#767878', fontStyle: 'italic'}}>
                              { `№ ${item.number} ${item.visitDate ? 'от ' + item.visitDate.split('T')[0] : ''}` }
                          </Text>
                      </View>
                      </View>
                      </View>
                      </TouchableHighlight>
                      </View>
                  )
                  }else{
                    if(item.type.shortName == 'Гость'){var title = item.visitorFullName;}else{var title = item.carNumber + ' ' + item.carModelText;}
                    return (
                      <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'white', margin: 1, borderRadius: 5}}>
                      <View style={{width: 6, marginBottom: 4, backgroundColor: status2colors[item.status && item.status.id], borderRadius: 5}}></View>
                        <View style={{flexDirection: 'column', marginLeft: 8, marginBottom: 1 }}>

                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 14, color: 'black', fontStyle: 'italic', marginRight: 5}}>
                          { item.type ? item.type.shortName : 'тип не указан' }
                          </Text>
                          <Text style={{fontSize: 14, color: 'red', fontStyle: 'italic'}}>{`   ${item.company && item.company.name || ' '}`}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 18, color: 'black'}}>{title}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 16, color: '#767878', marginTop: -3}}>{parking}</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 11, color: status2colors[item.status && item.status.id], fontStyle: 'italic', marginRight: 5}}>
                            { item.status ? item.status.name : '' }
                            </Text>

                            <Text style={{fontSize: 11, color: '#767878', fontStyle: 'italic'}}>
                                { `№ ${item.number} ${item.visitDate ? 'от ' + item.visitDate.split('T')[0] : ''}` }
                            </Text>
                        </View>
                        </View>
                      </View>
                    )}
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
}
