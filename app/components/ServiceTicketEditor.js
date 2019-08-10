import React, { Component } from 'react'
import { View,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  Image,
  LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Fumi } from 'react-native-textinput-effects'
import DatePicker from 'react-native-datepicker'
import ReactNativePickerModule from 'react-native-picker-module'
import { CheckBox } from 'react-native-elements'
import ImagePickerComponent from '../components/ImagePicker'
import DatePickerComponent from '../components/DatePicker'
import PickerComponent from '../components/PickerAlternate'

import { Colors } from '../theme'

export default class ServiceScreen extends Component {
  constructor(props) {
     super(props);
     this.state = {
       visitDate: this.props.ticket.visitDate,
       image: null
     }
  }

  setVisible = (field) => {
    state = this.state
    state[field] = !state[field]
    if(field == 'isCommonAreas'){
      this.props.updateField(state[field], field);
    }
    LayoutAnimation.easeInEaseOut();
    this.setState(state)
  }

  updateField = (data, field) => {
    this.props.updateField(data, field);
    LayoutAnimation.easeInEaseOut();

    var fields = this.state
    fields[field] = data

    var fieldsVisible = {
    }

    fields['fieldsVisible'] = fieldsVisible
    this.setState(fields);
  }

  updateFile = (uri) => {
    this.props.saveFile(uri)
    //this.setState({image: uri})
  }

  render () {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = true;
    switch(this.props.ticketType){
      case 'CARD':
          label = 'На изготовление пропуска';
          break;
      case 'SERVICE':
          label = 'Сервисная';
          break;
      case 'ALTSERVICE':
          label = 'На дополнительное обслуживание';
          break;
      default:
          label = 'Сервисная';
          break;
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
            <ScrollView>
                <View style={styles.fieldsContainer}>
                  <Text style={styles.field}>{label}</Text>
                </View>

                {this.props.ticketType == 'CARD' &&
                <View>
                <View style={styles.fieldsContainer}>
                <Fumi
                    style={[styles.fumiStyle, {borderColor: this.props.fieldsHighlights.visitorFullName ? Colors.accentColor : '#FFF'}]}
                    label={'ФИО сотрудника *'}
                    iconClass={Icon}
                    iconName={'person'}
                    iconColor={Colors.textColor}
                    iconSize={20}
                    labelStyle={styles.fumiLabel}
                    inputStyle={styles.fumiInput}
                    onChangeText={(text) => {this.updateField(text, 'visitorFullName')}}/>
                <PickerComponent
                    isHighlighted={this.props.fieldsHighlights.issueReason}
                    label="Причина"
                    items={this.props.cardReasons}
                    onUpdate={(text) => {this.updateField(text, 'issueReason')}}/>
                </View>
                <ImagePickerComponent
                  label='Выберите логотип'
                  isHighlighted={this.props.fieldsHighlights.logo}
                  onChoose={(file) => {this.props.saveFile(file, 'file')}}/>
                </View>
              }

                {this.props.ticketType != 'CARD' &&
                <View>
                <View style={styles.fieldsContainer}>
                <PickerComponent
                    isHighlighted={this.props.fieldsHighlights.service}
                    label="Сервис"
                    items={this.props.services}
                    onUpdate={(text) => {this.updateField(text, 'service')}}/>

                {this.props.ticketType == 'SERVICE' &&
                <CheckBox
                    title='Место общего пользования'
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                    checked={this.state.isCommonAreas}
                    checkedColor={Colors.textColor}
                    onPress={() => {this.setVisible('isCommonAreas')}}/>}

                {this.props.ticketType == 'ALTSERVICE' &&
                <Fumi
                    style={styles.fumiStyle}
                    label={'Поставщик материалов'}
                    iconClass={Icon}
                    iconName={'person'}
                    iconColor={Colors.textColor}
                    iconSize={20}
                    labelStyle={styles.fumiLabel}
                    inputStyle={styles.fumiInput}
                    onChangeText={(text) => {this.updateField(text, 'materialSupplier')}}/>}

                {!this.state.isCommonAreas &&
                <Fumi
                    style={[styles.fumiStyle, {borderColor: this.props.fieldsHighlights.room ? Colors.accentColor : '#FFF'}]}
                    label={'Помещение'}
                    iconClass={Icon}
                    iconName={'room'}
                    iconColor={Colors.textColor}
                    iconSize={20}
                    inputStyle={styles.fumiInput}
                    onChangeText={(text) => {this.props.updateField(text, 'room')}}
                />}
                </View>

                <TextInput
                  placeholder="Что сделать *"
                  underlineColorAndroid='transparent'
                  style={[styles.textInputStyle, {borderColor: this.props.fieldsHighlights.whatHappened ? Colors.accentColor : '#FFF'}]}
                  multiline={true}
                  scrollEnabled={true}
                  onChangeText={(text) => {this.props.updateField(text, 'whatHappened')}}
                  />

                </View>}

                <ImagePickerComponent
                  label='Выберите фото'
                  isHighlighted={this.props.fieldsHighlights.photo}
                  onChoose={(file) => {this.props.saveFile(file, 'photo')}}/>

            </ScrollView>
      </View>
    )
  }
}const styles = StyleSheet.create({
    fumiInput: {
      color: Colors.textColor,
      marginBottom: Platform.OS === 'android' ? 7 : 0
   },
   fumiStyle: {
     borderRadius: 20,
     backgroundColor: Colors.fieldsColor,
     borderWidth: 5,
     borderColor: '#FFF'
   },
   textInputStyle:{
    height: 160,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#FFF',
    backgroundColor : "#FFF",
    fontSize: 18,
    color: Colors.textColor,
    padding: 10,
    paddingTop: 10
  },
  field: {
    margin: 10,
    color: Colors.textColor,
    fontSize: 18,
    fontWeight: '500'
  },
  checkboxContainer: {
    marginTop: 8,
    backgroundColor: Colors.fieldsColor,
    borderRadius: 10,
    borderWidth: 0
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textColor
  },
  fieldsContainer: {
    backgroundColor: Colors.fieldsColor,
    borderRadius: 20,
    marginBottom: 10
  }
})
