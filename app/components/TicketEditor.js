import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Picker, TouchableOpacity } from 'react-native';
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
       selectedParking: 'Парковка'
     }
  }
  render () {
    //const parkingsById = {this.props.carParkings.map(parking => {return parking.name})}

    const minDate = new Date()
    const maxDate = new Date()
    maxDate.setFullYear(minDate.getFullYear()+1)

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <ScrollView>
                <Fumi
                    label={'ФИО посетителя'}
                    iconClass={Icon}
                    iconName={'person'}
                    iconColor={'#53565A'}
                    iconSize={20}
                    inputStyle={{ color: '#53565A' }}
                    onChangeText={this.props.updateVisitor}
                />

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

                    <ReactNativePickerModule
                        pickerRef={e => pickerRef = e}
                        value={this.state.selectedValue}
                        title={this.state.selectedParking}
                        ios={{duration: 330, overlayColor: 'rgba(0,0,0,0.3)'}}
                        cancelButton='Отмена'
                        confirmButton='Выбрать'
                        items={this.props.carParkings.map(parking => {return parking.name})}
                        onValueChange={(value) => {
                             this.setState({selectedValue: value })
                        }}/>

                    <TouchableOpacity onPress={() => {pickerRef.show()}} style={styles.picker}>
                      <Text style={styles.pickerLabel}>Выберите парковку</Text>
                    </TouchableOpacity>

                    <Fumi
                        label={'Место на парковке'}
                        iconClass={Icon}
                        iconName={'directions-car'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={this.props.updateCarNumber}
                    />
                    </View>
                }



                <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: '#53565A', fontSize: 16, alignSelf: 'center'}}>Дата посещения</Text>

                    <DatePicker
                        style={{width: 200, alignSelf: 'center', marginTop: 5}}
                        date={this.props.ticket.visitDate}
                        mode={this.props.showCarFields ? "datetime" : "date"}
                        placeholder="Выберите дату"
                        format={this.props.showCarFields ? "DD-MM HH:mm" : "DD-MM-YY"}
                        minDate={minDate}
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
                                borderWidth: 0.5,
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
     backgroundColor: '#FFFFFF',
     height: 60,
     alignItems: 'center',
     flexDirection: 'row'
   },
   pickerLabel: {
     alignSelf: 'center',
     color: '#53565A',
     fontSize: 15,
     fontWeight: 'bold',
     marginLeft: 58
   }
})
