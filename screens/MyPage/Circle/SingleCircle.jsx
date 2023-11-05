import { View, Text, Pressable } from 'react-native';
import { useState, FlatList } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import { SingleMap } from '../../../components/circle/single/SingleMap';

export const SingleCircle = ({ route }) => {
  const [ isReady, setIsReady ] = useState(splashState);
  //써클의 id값 찾아내기
  const { itemId } = route.params;

  if(!isReady) {
    return <SplashUI />
  } 
  else{
    return(
      <View style={{flex:1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={styles.personBox} />
        <SingleMap />
        <View style={styles.wrapper} >
          <Text style={styles.imageText}>사진</Text>
          <Pressable style={styles.optionButton}>
            <Text style={styles.optionText}>선택</Text>
          </Pressable>
        </View>
      </View>
    );
  }
};


