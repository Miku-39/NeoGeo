import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Images, Colors, Metrics } from '../theme'


export default MainComponent = (props) => {
    return (
        <View style={styles.mainContainer}>
            {
                /*<View style={styles.headerContainer}>
                    <Image source={Images.zhukovHeader} style={styles.headerImage} />
                </View>*/
            }

            <View style={styles.contentContainer}>
                <View style={styles.topButtonsContainer}>
                    <TouchableOpacity onPress={() => { props.addVisitTicket() }}>
                        <View style={styles.leftButton}>
                            <Image resizeMode='contain' source={Images.businessman} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка</Text>
                            <Text style={styles.buttonLabel}>на посещение</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addCarTicket() }}>
                        <View style={styles.rightButton}>
                            <Image resizeMode='contain' source={Images.car} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>Новая заявка</Text>
                            <Text style={styles.buttonLabel}>на въезд авто</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomButtonsContainer}>
                    <TouchableOpacity onPress={() => { props.openTickets() }}>
                        <View style={styles.leftButton}>
                            <Image resizeMode='contain' source={Images.list} style={styles.buttonImage}/>
                            <Text style={styles.buttonLabel}>Наши заявки</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.openEvents() }}>
                        <View style={styles.rightButton}>
                            <Image resizeMode='contain' source={Images.ring} style={styles.buttonImage}/>
                            <Text style={styles.buttonLabel}>События</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        height: 59,
        backgroundColor: '#627ab4'
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
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 14
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 14,
        marginRight: 14
    },
    leftButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 158,
        height: 158,
        marginRight: 14,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    rightButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 158,
        height: 158,
        borderRadius: 15,
        backgroundColor: 'white'
    },
    buttonImage: {
        width: 90,
        height: 90,
        marginTop: 10
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
        paddingRight: 7
    },
    touchableLabel: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.text,
    }
})

