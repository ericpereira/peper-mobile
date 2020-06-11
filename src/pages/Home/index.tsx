import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { AppLoading } from 'expo'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_500Medium,
  Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

const width = Dimensions.get('window').width

const Home = () => {
  const [chiliValue, setChiliValue] = useState<string>('200,99')
  const [weight, setWeight] = useState<string>('0,00')
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded){ //caso não tenha carregado as fontes ainda
    return <AppLoading />
  }else{
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <View style={styles.titlePrice}>
                <Text style={styles.textTitle}>Preço da Pimenta hoje</Text>
              </View>
              <View style={styles.bodyPrice}>
                <Text style={styles.dolar}>R$</Text>
                <Text style={styles.valuePrice}>{chiliValue}</Text>
              </View>
              <View style={styles.footerPrice}>
                <Text style={styles.textFooter}>Fonte: BRAZIL ASTA 570 - atualizado em 2006/2020 às 20:30</Text>
              </View>
            </View>
            <View style={styles.quotation}>
              <View style={styles.input}>
                <TextInputMask
                  placeholder="Informe o peso..."
                  style={styles.inputQuot}
                  keyboardType='numeric'
                  autoCorrect={false}
                  type={'money'}
                  options={{
                    precision: 3,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: ''
                  }}
                  value={String(weight)}
                  onChangeText={text => {
                    setWeight(text)
                  }}
                />                
                <Text style={styles.inputType}>kg</Text>
              </View>
              <View style={styles.button}>
                <RectButton style={styles.buttonQuot} onPress={() => {}} >
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon
                              name='monetization-on'
                              color='#fff'
                              size={20} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Fazer Cotação</Text>
                </RectButton>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
        
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  climate: {
    width: width * 0.9,
    height: 130,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 30
  },
  price: {
    width: width * 0.8,
    height: 230,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginTop: -15,
    alignItems: 'center',
    justifyContent: 'space-between',

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  quotation: {
    width: width * 0.8,
    marginTop: 30
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
    marginTop: 5
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
    fontSize: 25
  },
  textTemperature: {

  },
  titlePrice: {
    alignItems: 'center',
    flex: 1   
  },
  textTitle: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 13
  },
  bodyPrice: {
    flexDirection: 'row',
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerPrice: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  dolar: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 9,
    marginTop: 6,
    marginRight: 5
  },
  valuePrice: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 35
  },
  textFooter: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 9,
    color: '#ADADAD'
  },
  input: {
    flexDirection: 'row'
  },
  inputQuot: {
    height: 40,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    fontFamily: 'Ubuntu_500Medium',
    textAlign: 'center',
    fontSize: 25
  },
  inputType: {
    fontFamily: 'Ubuntu_500Medium',
    marginTop: 18,
    marginLeft: -15
  },
  button: {
    width: width * 0.8,
    alignItems: 'center',
    marginTop: 30
  },
  buttonQuot: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#FF1313',
    width: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontFamily: 'Ubuntu_300Light',
    color: '#fff',
    fontSize: 18
  }
})

export default Home

