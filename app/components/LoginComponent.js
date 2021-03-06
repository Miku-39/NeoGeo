import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Button,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground
} from 'react-native'

import { CheckBox } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

import { Colors, Images, Metrics } from '../theme'


class LoginComponent extends Component {
    render() {
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
        const elements = (
          <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={styles.logoContainer}>
                  <Image source={Images.logo} resizeMode='contain' style={styles.logo} />
              </View>

              <View style={styles.contentContainer}>
                      <View style={styles.inputFieldContainer}>

                          <View style={styles.iconContainer}>
                              <MaterialIcons name='person' size={28} color='gray' />
                          </View>

                          <View style={styles.verticalDivider}></View>

                          <TextInput
                              style={styles.input}
                              onChange={ (e) => this.props.changeUser(e.nativeEvent.text) }
                              autoCapitalize='none'
                              autoCorrect={false}
                              spellCheck={false}
                              placeholder='Введите имя пользователя'
                              value={this.props.user}
                              disabled={this.props.disabled}
                              autoCorrect={false}
                              underlineColorAndroid='transparent' />

                      </View>

                      <View style={styles.horizontalDivider}></View>

                      <View style={styles.inputFieldContainer}>

                          <View style={styles.iconContainer}>
                              <MaterialIcons name='lock' size={26} color='gray' />
                          </View>

                          <View style={styles.verticalDivider}></View>

                          <TextInput
                              style={styles.input}
                              onChange={ (e) => this.props.changePassword(e.nativeEvent.text) }
                              autoCapitalize="none"
                              placeholder="Введите пароль"
                              autoCorrect={false}
                              value={this.props.password}
                              disabled={this.props.disabled}
                              secureTextEntry={true}
                              underlineColorAndroid='transparent' />

                      </View>

                  <CheckBox
                      title='Запомнить меня'
                      onPress={this.props.changeRemember}
                      containerStyle={styles.checkboxContainer}
                      textStyle={styles.checkboxText}
                      checkedColor='white'
                      checked={this.props.remember}
                  />

                      <TouchableOpacity onPress={() => {
                          Keyboard.dismiss()
                          this.props.logIn()
                      }}>
                          <View style={styles.enterButton}>
                              <Text style={styles.enterText}>Войти</Text>
                          </View>
                      </TouchableOpacity>


                  {
                      this.props.disabled ?
                      <View style={{alignSelf: 'center'}}>
                          <ActivityIndicator size="large" color={Colors.accentColor}/>
                      </View> : null
                  }
              </View>
          </View>
        )
        return (
          <ImageBackground source={Images.Background} style={styles.backgroundImage}>

          {Platform.OS == 'android' ?
            <View style={styles.screenContainer}>
            {elements}
            </View> : <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={styles.screenContainer}>
            {elements}
            </KeyboardAvoidingView>
          }
          </ImageBackground>
        )
    }
}

export default LoginComponent


const styles = StyleSheet.create({ // стили всех элементов
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
    // resizeMode: 'cover', // or 'stretch'
  },
  screenContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '70%'
  },
  logoContainer: { //расположение логотипа
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  logo: { //логотип
    width: 200,
  },
  contentContainer: {
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },

  inputsContainer: { // заполняемое окно
    flexDirection: 'column',
    alignItems: 'center',
    width: Metrics.screenWidth
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '94%',
    height: 50,
    backgroundColor:'white',
    borderRadius: 15,
    opacity: 0.9
  },

  iconContainer: {
    width: 45,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#f6f6f6'
  },
  input: {
    width: Metrics.screenWidth - 80,
    height: 50,
    marginLeft: 7,
    marginTop: 1,
    textAlignVertical: 'center',
    fontSize: 17,
    color: 'gray'
  },
  horizontalDivider: {
    height: 5
  },
  enterContainer: {
    alignItems: 'center'
  },
  enterButton: { // кнопка
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.accentColor,
    width: '70%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 15,
    opacity: 0.9
  },
  enterText: { // вводимый текст
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    margin: 5
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white'
  }
});
