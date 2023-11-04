import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AltScreen } from '../components/header/Stack/AltScreen';
import { RecoilRoot } from 'recoil';

export default function App() {
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('../assets/fonts/IropkeBatangM.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <RecoilRoot>
      <AltScreen />
    </RecoilRoot>
  );
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
