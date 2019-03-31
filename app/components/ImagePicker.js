import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, StatusBar } from 'react-native';
import { ImagePicker, Permissions } from 'expo';

export default class ImagePickerComponent extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       image: null
     }
  }

  _pickImage = async () => {
    await this._askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.onChoose(result.uri)
    }
  };

  _launchCamera = async () => {
    await this._askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.onChoose(result.uri)
    }
  }

  _askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };


  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar backgroundColor="blue" barStyle="light-content" />
        <TouchableOpacity
          onPress={this._pickImage}
          style={styles.picker}>
        <Text style={styles.pickerText}>Из галереи</Text></TouchableOpacity>

        <TouchableOpacity
          onPress={this._launchCamera}
          style={styles.picker}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={styles.pickerText}>Сделать снимок</Text>
        </View></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker: {
     borderRadius: 20,
     marginTop: 5,
     width: 200,
     height: 40,
     alignSelf: 'center',
     alignItems: 'center',
     backgroundColor: '#C9C8C7',
     flexDirection: 'column'
   },
   pickerLabel: {
     fontWeight: 'bold',
     color: '#53565A',
     fontSize: 16,
     textAlign: 'center'
   },
   pickerText:{
     fontSize: 18,
     color: '#53565A'
    }
})
