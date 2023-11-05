import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';

export const SingleCircle = () => {
  const [ isReady, setIsReady ] = useState(splashState);
  if(!isReady) {
    return <SplashUI />
  } else{
      return(
        <View>
          <Text>
            써클 1의 룸입니다.
          </Text>
        </View>
      );
  }
};
