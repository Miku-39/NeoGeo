import React, { Component } from 'react';
import { ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  NativeModules,
  LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Images, Colors, Metrics } from '../theme'

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default MainComponent = (props) => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
    return (
        <ScrollView style={styles.mainContainer}>
            {
                /*<View style={styles.headerContainer}>
                    <Image source={Images.zhukovHeader} style={styles.headerImage} />
                </View>*/
            }
            <View style={styles.contentContainer} onLayout={() => {LayoutAnimation.easeInEaseOut();}}>

                    <TouchableOpacity onPress={() => { props.openTickets() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.list} style={styles.buttonImage}/>
                            <Text style={styles.buttonLabel}>Наши{"\n"}заявки</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addVisitTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.hand} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>На посещение</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addCarTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.car} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>На въезд авто</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addCardTicket() }}>
                        <View style={styles.Button}>
                            <Image resizeMode='contain' source={Images.card} style={styles.buttonImage} />
                            <Text style={styles.buttonLabel}>На пост.{"\n"}пропуск</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addGoodsInTicket() }}>
                          <View style={styles.Button}>
                              <Image resizeMode='contain' source={Images.boxIn} style={styles.buttonImage} />
                              <Text style={styles.buttonLabel}>На внос{"\n"}имущества</Text>
                          </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addGoodsOutTicket() }}>
                          <View style={styles.Button}>
                              <Image resizeMode='contain' source={Images.boxOut} style={styles.buttonImage} />
                              <Text style={styles.buttonLabel}>На вынос{"\n"}имущества</Text>
                          </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addServiceTicket() }}>
                        <View style={styles.Button}>
                          <Image resizeMode='contain' source={Images.wrench} style={styles.buttonImage} />
                          <Text style={styles.buttonLabel}>Сервисная</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { props.addAltServiceTicket() }}>
                        <View style={styles.Button}>
                          <Image resizeMode='contain' source={Images.wrenchAlt} style={styles.buttonImage} />
                          <Text style={styles.buttonLabel}>На доп.{"\n"}обслуживание</Text>
                        </View>
                    </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        width: '100%',
        height: '100%'
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 59
    },
    Button: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 165,
        height: 165,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        margin: 5,
        backgroundColor: 'white',
    },
    buttonImage: {
        width: 85,
        height: 85,
        margin: 5
    },
    buttonLabel: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center'
    },
    field: {
      margin: 10,
      color: Colors.textColor,
      fontSize: 22,
      fontWeight: '500',
      textAlign: 'center'
    },
    fieldsContainer: {
      alignItems: 'center',
      backgroundColor: Colors.fieldsColor,
      borderRadius: 15,
      width: '90%',
      marginBottom: 15,
      marginTop: 15
    }
})
