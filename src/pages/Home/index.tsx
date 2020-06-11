import React, {  } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
import { AppLoading } from 'expo'

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_500Medium,
  Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

const width = Dimensions.get('window').width

const Home = () => {
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded){ //caso não tenha carregado as fontes ainda
    return <AppLoading />
  }else{
    return (
      <View style={styles.container}>
        <View style={styles.climate}>
          <View style={styles.headerClimate}>
            <Text style={styles.textClimate}>Clima</Text>
            <Text style={styles.cityClimate}>São Mateus - ES</Text>
          </View>
          <View style={styles.bodyClimate}>
            <View style={styles.temperature}>
              <Text style={styles.textTemperature}>Dom</Text>
              <Text style={styles.valueTemperature}>27º C</Text>
            </View>
            <View style={styles.week}>
              <View style={styles.day}>
                <Text style={styles.textDay}>seg</Text>
                <Text style={styles.temperatureDay}>28ºC</Text>
              </View>
              <View style={styles.day}>
                <Text style={styles.textDay}>ter</Text>
                <Text style={styles.temperatureDay}>29ºC</Text>
              </View>
              <View style={styles.day}>
                <Text style={styles.textDay}>qua</Text>
                <Text style={styles.temperatureDay}>18ºC</Text>
              </View>
              <View style={styles.day}>
                <Text style={styles.textDay}>qui</Text>
                <Text style={styles.temperatureDay}>28ºC</Text>
              </View>
              <View style={styles.day}>
                <Text style={styles.textDay}>sex</Text>
                <Text style={styles.temperatureDay}>28ºC</Text>
              </View>
              <View style={styles.day}>
                <Text style={styles.textDay}>sáb</Text>
                <Text style={styles.temperatureDay}>dom</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.price}>
  
        </View>
        <View style={styles.quotation}>
  
        </View>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {

  },
  climate: {
    width: width * 0.9,
    height: 130,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30
  },
  price: {

  },
  quotation: {

  },
  headerClimate: {
    flexDirection: 'row'
  },
  bodyClimate: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  textClimate: {
    fontFamily: 'Ubuntu_300Light'
  },
  cityClimate: {
    marginLeft: 5,
    fontFamily: 'Ubuntu_500Medium'
  },
  temperature: {

  },
  week: {
    paddingTop: 25,
    paddingLeft: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  day: {
    
  },
  textDay: {
    fontSize: 11,
    fontFamily: 'Ubuntu_300Light'
  },
  temperatureDay: {
    fontSize: 11,
    fontFamily: 'Ubuntu_300Light'
  },
  valueTemperature: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 30
  },
  textTemperature: {

  }
})

export default Home

