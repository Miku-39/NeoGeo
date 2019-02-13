import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Fumi } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'

import { Images, Colors } from '../theme'


export default TicketScreen = props => {
    const { ticket, showCarFields, showGoodsFields, showServiceFields, ticketType } = props
    state = {user: ''}
     updateUser = (user) => {
        props.updateServiceReason
     }
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
                    onChangeText={props.updateVisitor}
                />

                {
                    showCarFields &&
                    <Fumi
                        label={'Марка автомобиля'}
                        iconClass={Icon}
                        iconName={'directions-car'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={props.updateCarModel}
                    />
                }

                {
                    showCarFields &&
                    <Fumi
                        label={'Номер автомобиля'}
                        iconClass={Icon}
                        iconName={'mode-edit'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={props.updateCarNumber}
                    />
                }
                {
                    showGoodsFields &&
                    <Fumi
                        label={'Информация о грузе'}
                        iconClass={Icon}
                        iconName={'mode-edit'}
                        iconColor={'#53565A'}
                        iconSize={20}
                        inputStyle={{ color: '#53565A' }}
                        onChangeText={props.updateGoodsName}
                    />
                }
                {
                    showServiceFields &&
                    <View>
                        <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
                           <Picker.Item label = "Steve" value = "steve" />
                           <Picker.Item label = "Ellen" value = "ellen" />
                           <Picker.Item label = "Maria" value = "maria" />
                        </Picker>
                        <Text style = {styles.text}>{this.state.user}</Text>
                     </View>

                }



                <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: '#53565A', fontSize: 16, alignSelf: 'center'}}>Дата посещения</Text>

                    <DatePicker
                        style={{width: 200, alignSelf: 'center', marginTop: 5}}
                        date={ticket.visitDate}
                        mode="date"
                        placeholder="Выберите дату"
                        format="YYYY-MM-DD"
                        minDate="2018-01-01"
                        maxDate="2020-12-31"
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
                        onDateChange={props.updateVisitDate}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   }
})
