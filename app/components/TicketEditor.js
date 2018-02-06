import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Fumi } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'

import { Images, Colors } from '../theme'


export default TicketScreen = props => {
    const { ticket, showCarFields } = props

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white'}}>
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
