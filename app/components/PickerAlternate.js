import { Picker } from 'react-native-woodpicker'
import React from 'react';
import {  View,
          StyleSheet,
          Text,
          NativeModules,
          LayoutAnimation } from 'react-native';
import { Colors } from '../theme'


export default class PickerComponent extends React.Component {
  constructor(props) {
     super(props);
  }

  state = {
    pickedData: null
  };

  data = [{label: 'Не выбрано', value: ''}].concat(this.props.items.map(item => {return {label: item.name, value: item.id}}))
  handlePicker = data => {
    LayoutAnimation.easeInEaseOut()
    this.setState({ pickedData: data });
  };

  render() {
    return (
      <View style={{margin: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={styles.pickerLabel}>{this.props.label}</Text>
        <View style={[styles.picker, {
        borderColor: this.props.isHighlighted ? Colors.accentColor : Colors.buttonColor,
        borderRadius: this.props.isHighlighted ? 25 : 20,
        height: this.props.isHighlighted ? 50 : 40,
        minWidth: this.props.isHighlighted ? 200 : 190,}]}>
          <Picker
            style={{height: this.props.isHighlighted ? 50 : 40,
                    minWidth: this.props.isHighlighted ? 190 : 180,
                    marginLeft: 5,
                    marginRight: 5}}
            onValueChange={this.handlePicker}
            items={this.data}
            title={this.props.label}
            placeholder="Выберите"
            doneText='Выбрать'
            value={this.state.pickedData}
            onItemChange={(item) => {this.props.onUpdate(item.value)}}
            placeholderStyle={styles.pickerText}
            //androidPickerMode="dropdown"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.buttonColor,
    borderColor: Colors.buttonColor,
    borderWidth: 5,
    marginRight: 10
  },
  pickerLabel: {
    fontWeight: 'bold',
    color: Colors.textColor,
    margin: 5,
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center'
  },
  pickerText:{
    marginBottom: 10,
    fontSize: 18,
    alignSelf: 'center',
    color: Colors.textColor
   }
})
