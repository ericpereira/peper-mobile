import React from 'react';
import {
    StyleSheet,
    StatusBar } from 'react-native';

import {
  useFonts,
  Ubuntu_300Light,
  Ubuntu_500Medium,
  Ubuntu_700Bold } from '@expo-google-fonts/ubuntu'

import { AppLoading } from 'expo'

import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_300Light,
    Ubuntu_500Medium,
    Ubuntu_700Bold
  })

  //caso as fontes ainda não tenham sido carregadas, mostra a pagina de carregamento
  if(!fontsLoaded){
    return <AppLoading />
  }

  //caso esteja tudo certo, carrega o arquivo de rotas
  return (
    <>
      {/* <StatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
        /> */}
      <Routes />     
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
