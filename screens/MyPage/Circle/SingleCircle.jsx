import { View, Text } from 'react-native';
import * as SplashScreen from "expo-splash-screen";

export const SingleCircle = () => {
  delay_splash();
  return(
    <View>
      <Text>
        써클 1의 룸입니다.
      </Text>
    </View>
  );
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const delay_splash = async() => {
  await SplashScreen.preventAutoHideAsync();
  await sleep(5000);
  await SplashScreen.hideAsync();
};