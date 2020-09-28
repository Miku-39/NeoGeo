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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Colors } from '../theme'

export default class MakeCardScreen extends Component {
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
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          <KeyboardAwareScrollView
              enableOnAndroid={true}
              extraHeight={130}
              extraScrollHeight={130}>
              <View style={{
                flexDirection: 'column',
                marginLeft: 5,
                marginRight: 5}}>

                <View style={styles.fieldsContainer}>
                  <Text style={styles.field}>На изготовление метки</Text>
                </View>

                <View style={styles.fieldsContainer}>
                <PickerComponent
                    isHighlighted={this.props.fieldsHighlights.issueReason}
                    label="Причина *"
                    items={this.props.issueReasons}
                    onUpdate={(text) => {this.updateField(text, 'issueReason')}}/>
                </View>

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
                <Fumi
                    style={[styles.fumiStyle, {marginTop: -5, borderColor: this.props.fieldsHighlights.carModelText ? Colors.accentColor : '#FFF'}]}
                    label={'Марка автомобиля *'}
                    iconClass={Icon}
                    iconName={'directions-car'}
                    iconColor={Colors.textColor}
                    iconSize={20}
                    labelStyle={styles.fumiLabel}
                    inputStyle={styles.fumiInput}
                    onChangeText={(text) => {this.updateField(text, 'carModelText')}}/>
                <Fumi
                    style={[styles.fumiStyle, {marginTop: -5, borderColor: this.props.fieldsHighlights.carNumber ? Colors.accentColor : '#FFF'}]}
                    label={'Номер автомобиля *'}
                    iconClass={Icon}
                    iconName={'directions-car'}
                    iconColor={Colors.textColor}
                    iconSize={20}
                    labelStyle={styles.fumiLabel}
                    inputStyle={styles.fumiInput}
                    onChangeText={(text) => {this.updateField(text, 'carNumber')}}/>
                <PickerComponent
                    isHighlighted={this.props.fieldsHighlights.parking}
                    label="Парковка"
                    items={this.props.carParkings}
                    onUpdate={(text) => {this.updateField(text, 'parking')}}/>
                <Fumi
                    style={[styles.fumiStyle, {borderColor: this.props.fieldsHighlights.parkingPlace ? Colors.accentColor : '#FFF'}]}
                    label={'Место на парковке *'}
                    iconClass={Icon}
                    iconName={'room'}
                    iconColor={Colors.textColor}
                    iconSize={20}
                    labelStyle={styles.fumiLabel}
                    inputStyle={styles.fumiInput}
                    onChangeText={(text) => {this.updateField(text, 'parkingPlace')}}/>
                </View>

                <View style={styles.fieldsContainer}>
                  <TextInput
                    placeholder="Примечание"
                    underlineColorAndroid='transparent'
                    style={styles.textInputStyle}
                    multiline={true}
                    scrollEnabled={true}
                    onChangeText={(text) => {this.props.updateField(text, 'Note')}}
                    />
                </View>

            </View>
            </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
