import React, { Component } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Images, Colors, Metrics } from '../theme'


export default MainComponent = (props) => {
    return (
        <ScrollView style={styles.mainContainer}>
            {
                /*<View style={styles.headerContainer}>
                    <Image source={Images.zhukovHeader} style={styles.headerImage} />
                </View>*/
            }

            <View style={styles.contentContainer}>
                <View style={styles.ButtonsContainer}>
                    <TouchableOpacity onPress={() => { props.openTickets() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.list} style={styles.buttonImage}/>
                            <Text style={styles.buttonLabel}>Наши заявки</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addVisitTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.businessman} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка</Text>
                            <Text style={styles.buttonLabel}>на посещение</Text>
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={styles.ButtonsContainer}>
                    <TouchableOpacity onPress={() => { props.addCarTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.car} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка</Text>
                            <Text style={styles.buttonLabel}>на въезд авто</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addServiceTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.wrench} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка</Text>
                            <Text style={styles.buttonLabel}>в сервис</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.ButtonsContainer}>

                    <TouchableOpacity onPress={() => { props.addGoodsArriveTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.box} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка на</Text>
                            <Text style={styles.buttonLabel}>внос имущества</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addGoodsLeaveTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.box} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка на</Text>
                            <Text style={styles.buttonLabel}>вынос имущества</Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.backgroundColor
    },
    headerContainer: {
        height: 240,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden'
    },
    headerImage: {
        width: '100%',
        resizeMode: 'stretch'
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 59
    },
    menuIcon: {
        paddingLeft: 14,
        color: 'white'
    },
    title: {
        fontSize: 22,
        color: 'white'
    },
    settingsIcon: {
        paddingRight: 4,
        color: 'white'
    },
    ButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    Button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 158,
        height: 158,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: 15
    },
    buttonImage: {
        width: 90,
        height: 90,
        margin: 10
    },
    buttonLabel: {
        fontSize: 14
    },
    touchableContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    touchableLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text,
    }
})
