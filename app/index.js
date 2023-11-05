import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { AltScreen } from '../components/header/Stack/AltScreen';
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function App() {
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('../assets/fonts/IropkeBatangM.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <RootSiblingParent>
      <RecoilRoot>
        <AltScreen />
      </RecoilRoot>
    </RootSiblingParent>
  );
}
