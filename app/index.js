import React from 'react';
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { AltScreen } from '../components/header';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query';
import { RootSiblingParent } from 'react-native-root-siblings';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  const ctx = require.context('./app');
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('../assets/fonts/IropkeBatangM.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RootSiblingParent>
        <RecoilRoot>
          <AltScreen />
        </RecoilRoot>
      </RootSiblingParent>
    </QueryClientProvider>
    // <ExpoRoot context={ctx} />
  );
}

registerRootComponent(App);
