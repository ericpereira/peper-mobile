import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import * as Location from 'expo-location'

//para converter a data de utc para pt-br
import moment from 'moment'
import 'moment/locale/pt-br'

import { RectButton } from 'react-native-gesture-handler'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native' //para navegar através do botão

import axios from 'axios' //para fazer a chamada assincrona da previsão do tempo

const width = Dimensions.get('window').width

//transformar a primeira letra em maiscula
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

interface Climate {
  day: string,
  temperature: number,
  hour: number
}

const Home = () => {
  //dados do clima
  const [days, setDays] = useState<Climate[]>()

  //dados da localização do usuário
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [chiliValue, setChiliValue] = useState<string>('200,99')
  const [weight, setWeight] = useState<string>('0,00')

  //posição inicial
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const api = axios.create({
      baseURL: 'http://192.168.1.9:3333'
  })
  
  const navigation = useNavigation()

  async function loadPosition() {
    //verifica se deu permissão ou não
    const { status } = await Location.requestPermissionsAsync()

    if(status !== 'granted'){
        Alert.alert('Ops...', 'Precisamos da sua permissão para acessar a localização.')
        return
    }

    const location = await Location.getCurrentPositionAsync({
        accuracy:Location.Accuracy.High
    })

    const { latitude, longitude } = location.coords

    setInitialPosition([
        latitude,
        longitude
    ])
  }

  //carrega posição inicial
  useEffect(() => {
    //pede permissões ao usuário para acessar a localização
    loadPosition()
  }, [])

  useEffect(() => {
    api.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${initialPosition[0]}&lon=${initialPosition[1]}&cnt=5&appid=c5b2c1dcd34bd22371bc8813868dddf6&exclude=current,minutely,hourly&units=metric&lang=pt_br`)
      .then(response => {
        //dia e hora atual
        //const day = capitalize(moment.utc(response.data.daily[0].dt*1000).locale('pt-br').format('ddd')) //pega o dia da semana
        const hour = Number(moment.utc(response.data.daily[0].dt*1000).locale('pt-br').format('HH')) //pega a hora atual
        console.log(`hora ${hour}`)

        const daily = response.data.daily

        const days = daily.map(dayResponse => {
          //pega o dia atual
          const day = moment.utc(dayResponse.dt*1000).locale('pt-br').format('ddd') //pega o dia da semana
          
          let temperature = 0
          
          //pega a temperatura
          if(hour >= 6 && hour <= 18){ //dia
            temperature = dayResponse.feels_like.day

          }else{ //noite
            temperature = dayResponse.feels_like.night
          }

          return { 
            day,
            temperature
          }
        })

        //seta os dias atuais
        setDays(days)
        
      })
  }, []) //chama quando a posição inicial é alterada

  function handleNavigationQuotation() {
    const weightFloat = parseFloat(weight.replace('.', '').replace(',','.'))
    const chiliFloat = parseFloat(chiliValue.replace('.', '').replace(',','.'))

    if(weightFloat > 0.0){
      navigation.navigate('Quotation', {
        weight: weightFloat,
        chiliValue: chiliFloat
      })
    }    
  }


  

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
                  <Text style={styles.textTemperature}>{days && capitalize(days[0].day)}</Text>
                  <Text style={styles.valueTemperature}>{days && Math.floor(days[0].temperature)}ºC</Text>
                </View>
                <View style={styles.week}>
                  {
                  days &&
                  days.map(day => {
                    if(day.day !== days[0].day){
                      return (
                        <View
                          key={day.day}
                          style={styles.day}>
                          <Text style={styles.textDay}>{day.day}</Text>
                          <Text style={styles.temperatureDay}>{Math.floor(day.temperature)}ºC</Text>
                        </View>
                      )
                    }
                  })} 
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
                    precision: 2,
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
                <RectButton
                  style={styles.buttonQuot}
                  onPress={handleNavigationQuotation} >
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

