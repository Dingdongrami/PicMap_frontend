import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';

export const SingleCircle = ({ route }) => {
  const [ isReady, setIsReady ] = useState(splashState);
  const { itemId } = route.params;

  if(!isReady) {
    return <SplashUI />
  } else{
      return(
        <View>
          <Text>
            {itemId}룸입니다.
          </Text>
        </View>
      );
  }
};
