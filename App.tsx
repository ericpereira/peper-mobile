import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView } from 'react-native';

//import pages
import Home from './src/pages/Home'

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Home />
      </SafeAreaView>
      
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
