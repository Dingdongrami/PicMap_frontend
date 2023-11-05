import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { splashState } from '../../../stores/splash-store';

export const SplashUI = () => {
  const [ isReady, setIsReady ] = useRecoilState(splashState);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SingleCircle');
      setIsReady(true);
    }, 3000);
  }, []);

  return(
    <View>
      <Text>
        대기화면입니다.
      </Text>
    </View>
  );
};
