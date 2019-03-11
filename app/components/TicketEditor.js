import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Picker, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Fumi } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'
import ReactNativePickerModule from 'react-native-picker-module'

import { Images, Colors } from '../theme'

export default class TicketScreen extends Component {
  constructor(props) {
     super(props);
     this.state = {
       selectedValue: null,
       selectedParking: this.props.initialParking
     }
  }
  render () {
    const minDate = new Date()
    const maxDate = new Date()

    switch(this.props.ticketType){
      case 'CAR':
          parkings = this.props.carParkings;
          parkingsByIndex = parkings.map(parking => {return parking.name})
          idByIndex = parkings.map(parking => {return parking.id})
          break;
      case 'GOODS_ARRIVE' || 'GOODS_LEAVE':
          parkings = this.props.goodsParkings;
          parkingsByIndex = parkings.map(parking => {return parking.name})
          idByIndex = parkings.map(parking => {return parking.id})
          break;
    }


    minDate.setFullYear(minDate.getFullYear()-1)
    maxDate.setFullYear(minDate.getFullYear()+2)
    pickerFormat = this.state.selectedParking == 'Гостевая' ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD"
    pickerMode = this.state.selectedParking == 'Гостевая' ? "datetime" : "date"
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <ScrollView>
              {
                this.props.ticketType != 'SERVICE' &&
                  <Fumi
                      label={'ФИО посетителя'}
                      iconClass={Icon}
                      iconName={'person'}
                      iconColor={'#53565A'}
                      iconSize={20}
                      inputStyle={{ color: '#53565A' }}
                      onChangeText={this.props.updateVisitor}
                  />
                }
                {
                    this.props.showCarFields &&
                    <View>
                    <Fumi
                        label={'Марка автомобиля'}
                        iconClass={Icon}
                        iconName={'directions-car'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={this.props.updateCarModel}
                    />

                    <Fumi
                        label={'Номер автомобиля'}
                        iconClass={Icon}
                        iconName={'directions-car'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={this.props.updateCarNumber}
                    />

                  { this.state.selectedParking != 'Гостевая' && this.props.ticketType == 'CAR' &&
                    <Fumi
                        label={'Место на парковке'}
                        iconClass={Icon}
                        iconName={'directions-car'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={this.props.updateParkingPlace}
                    />
                  }
                  { this.props.ticketType == 'GOODS_LEAVE' || this.props.ticketType == 'GOODS_ARRIVE' &&
                    <Fumi
                        label={'Информация о грузе'}
                        iconClass={Icon}
                        iconName={'directions-car'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={this.props.updateGoods}
                    />
                  }

                    {
                      Platform.OS === 'android' &&
                      <View style={{marginTop: 10}}>
                      <Text style={styles.pickerLabel}>Парковка</Text>
                      <View style={styles.picker}>
                      <Picker
                          selectedValue={this.state.selectedParking}
                          style={{height: 40, width: 180}}
                          onValueChange={(itemValue, itemIndex) =>
                          {
                          this.props.updateParking(itemValue, idByIndex[itemIndex]);
                          this.setState({selectedParking: itemValue})
                          }
                          }>
                          {parkings.map(parking => {return <Picker.Item label={parking.name} value={parking.name}/>})}
                      </Picker>
                      </View>
                      </View>
                    }

                    {
                        Platform.OS === 'ios' &&
                        <View style={{marginTop: 10}}>
                        <Text style={styles.pickerLabel}>Парковка</Text>
                          <ReactNativePickerModule
                                          pickerRef={e => pickerRef = e}
                                          value={this.state.selectedValue}
                                          title={this.state.selectedParking}
                                          cancelButton='Отмена'
                                          confirmButton='Выбрать'
                                          items={parkings.map(parking => {return parking.name})}
                                          onValueChange={(value) => {
                                               this.props.updateParking(parkingsByIndex[value], idByIndex[value]);
                                               this.setState({selectedValue: value })
                                               this.setState({selectedParking: parkingsByIndex[value]})
                                          }}/>

                          <TouchableOpacity onPress={() => {pickerRef.show()}} style={styles.picker}>
                            <Text style={styles.pickerText}>{this.state.selectedParking}</Text>
                          </TouchableOpacity>

                        </View>
                      }
                  </View>
                }

                <View style={{marginTop: 10}}>
                    <Text style={styles.pickerLabel}>Дата посещения</Text>

                    <DatePicker
                        style={{width: 200, alignSelf: 'center', marginTop: 5}}
                        date={this.props.ticket.visitDate}
                        mode={pickerMode}
                        placeholder="Выберите дату"
                        format={pickerFormat}
                        minDate={minDate}
                        minuteInterval={5}
                        locale="ru-RU"
                        maxDate={maxDate}
                        confirmBtnText="Подтвердить"
                        cancelBtnText="Отмена"
                        placeholder='Выберите дату посещения'
                        customStyles={{
                            dateIcon: {
                                width: 0
                            },
                            dateInput: {
                                borderRadius: 20,
                                borderWidth: 0,
                                backgroundColor: '#C9C8C7'
                            }
                        }}
                        onDateChange={this.props.updateVisitDate}
                    />
                </View>
            </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker: {
     borderRadius: 20,
     marginTop: 5,
     width: 200,
     height: 40,
     alignSelf: 'center',
     alignItems: 'center',
     backgroundColor: '#C9C8C7'
   },
   pickerLabel: {
     fontWeight: 'bold',
     color: '#53565A',
     fontSize: 16,
     alignSelf: 'center'
   },
   pickerText:{
     fontSize: 18,
     alignSelf: 'center',
     margin: 8,
     color: '#53565A'
   }
})
