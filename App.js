import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const hKey = '@MyApp:hKey';
const bKey = '@MyApp:bKey';

export default class App extends Component {
  state = {
    height: '',
    weight: '',
    bmi: '',
  };

  constructor(props) {
    super(props);
    this.onLoad();
  }

  onLoad = async () => {
    try {
      const height = await AsyncStorage.getItem(hKey);
      this.setState({ height });
      const bmi = await AsyncStorage.getItem(bKey);
      this.setState({ bmi });
    } catch (error) {
      Alert.alert('Error', 'There was an error while loading the data');
    }
  }

  onSave = async () => {
    const { height, weight, bmi } = this.state;
    this.onBChange(this.calcBMI(height, weight));
    try {
      await AsyncStorage.setItem(hKey, height);
      await AsyncStorage.setItem(bKey, bmi);
      Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
  }

  calcBMI = (height, weight) => {
    let bmi = ((weight / (height * height)) * 703).toFixed(1);
    return bmi
  }

  onHChange = (height) => {
    this.setState({ height });
  }
  onWChange = (weight) => {
    this.setState({ weight });
  }
  onBChange = (bmi) => {
    this.setState({ bmi });
  }

  render() {
    const { height, weight, bmi } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.toolbar}>BMI Calculator</Text>
        <TextInput
            style={styles.input}
            onChangeText={this.onWChange}
            value={weight}
            placeholder="Weight in Pounds"
          />
          <TextInput
            style={styles.input}
            onChangeText={this.onHChange}
            value={height}
            placeholder="Height in Inches"
          />
          <TouchableOpacity onPress={this.onSave} style={styles.button}>
            <Text style={styles.buttonText}>Compute BMI</Text>
          </TouchableOpacity>
          <Text style={styles.bmiListing}>Your BMI is: {bmi}</Text>
          <Text style={styles.bmiAssess}>Assessing Your BMI {'\n'}
              {'\t'} Underweight: less than 18.5{'\n'}
              {'\t'} Healthy: 18.5 to 24.9{'\n'}
              {'\t'} Overweight: 25.0 to 29.9{'\n'}
              {'\t'} Obese: 30.0 or higher
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
toolbar: {
  padding: 30,
  backgroundColor: '#f4511e',
  fontSize: 28,
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
},
input: {
  fontSize: 24,
  textAlign: 'left',
  padding: 10,
},
button:{
  backgroundColor: '#34495e',
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 10,
  width: '95%',
  margin: 10,
},
buttonText:{
  fontSize: 24,
  color: 'white',
  textAlign: 'center',
},
bmiListing:{
  textAlign: 'center',
  marginTop: 20,
  fontSize: 28,
},
bmiAssess: {
  marginTop: 20,
  fontSize: 20,
}
});