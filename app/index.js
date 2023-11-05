import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AltScreen } from '../components/Header/Stack/AltScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('../assets/fonts/IropkeBatangM.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return <AltScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
  },
});
