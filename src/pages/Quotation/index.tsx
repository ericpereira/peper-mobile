import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableHighlight
} from 'react-native'

import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation, useRoute } from '@react-navigation/native'
import Logo from "../../../assets/pimenta.svg"

interface Params {
  chiliValue: number,
  weight: number,
  updateDate: string,
}

const width = Dimensions.get('window').width

const formatNumber = (amount, decimalCount = 2, decimal = ",", thousands = ".") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    //console.log(e)
  }
};

const Quotation = () => {
  

  const navigation = useNavigation() //para poder navegar
  const route = useRoute() //para poder usar os dados passados na rota

  const routeParams = route.params as Params

  //estados do componente
  const quotInitial = routeParams.weight * routeParams.chiliValue
  const weightInitial = formatNumber(routeParams.weight)

  const [quotationValue, setQuotationValue] = useState<string>(formatNumber(quotInitial))
  
  //peso inicial
  const [weight, setWeight] = useState<string>('0,00')
  

  function handleBack() {
    navigation.goBack()
  }

  function handleQuote(weight){
    //transforma o peso em float e multiplica
    const quotationValueFloat = parseFloat(weight.replace('.', '').replace(',','.')) * routeParams.chiliValue
    //console.log(`quotationValueFloat ${quotationValueFloat}`)
    setQuotationValue(formatNumber(quotationValueFloat))
    
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>      
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={handleBack}>
            <Icon              
              name='arrow-back'
              color='#B0B0B0'
              size={24} />
          </TouchableOpacity>
          
          <View style={styles.container}>
            <Logo width={120} height={80} />
            <View style={styles.quotPriceHeader}>
              <Text style={styles.quotTitleText}>Preço Cotado</Text>
              <View style={styles.quotPriceBody}>
                <View style={styles.rowListQuot}>
                  <Text style={styles.iconQuot}>R$</Text>
                  <Text style={styles.valueQuot}>{formatNumber(routeParams.chiliValue)}</Text>
                </View>
                <View style={[styles.rowListQuot, { justifyContent: 'flex-end' }]}>
                  <Text style={styles.iconQuot}>X</Text>
                  <Text style={styles.valueQuot}>{weight === '0,00' ? weightInitial : weight}</Text>
                </View>
              </View>            
            </View>
            <View style={styles.price}>
              <View style={styles.titlePrice}>
                <Text style={styles.textTitle}>Valor total</Text>
              </View>
              <View style={styles.bodyPrice}>
                <Text style={styles.dolar}>R$</Text>
                <Text style={styles.valuePrice}>{quotationValue}</Text>
              </View>
              <View style={styles.footerPrice}>
                <Text style={styles.textFooter}>Fonte: BRAZIL ASTA 570 - atualizado em {routeParams.updateDate}</Text>
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
                  value={weight}
                  onChangeText={text => {
                    //a cada vez que muda o peso, atualiza o valor da cotação
                    setWeight(text)
                    handleQuote(text)
                  }}
                />                
                <Text style={styles.inputType}>kg</Text>
              </View>
              {/* <View style={styles.button}>
                <RectButton
                  style={styles.buttonQuot}
                  onPress={handleQuote} >
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
              </View> */}
            </View>
          </View>
          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>      
  )
}

const styles = StyleSheet.create({
  buttonBack: {
    marginTop: 50,
    marginLeft: 30,
    width: 30
  },
  iconQuot: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 14,
    marginBottom: 5,
    marginRight: 5
  },
  valueQuot: {
    fontFamily: 'Ubuntu_500Medium',
    fontSize: 24,
  },
  rowListQuot: {
    flexDirection: 'row',
    alignItems: "flex-end",
    flex: 1,
  },
  quotPriceBody: {
    flexDirection: 'row',
    width: width * 0.8,
    marginBottom: 15
  },
  quotPriceHeader: {
    width: width * 0.8,
  },
  quotTitleText: {
    fontFamily: 'Ubuntu_300Light',
    fontSize: 14,
    marginBottom: 10
  },
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

export default Quotation