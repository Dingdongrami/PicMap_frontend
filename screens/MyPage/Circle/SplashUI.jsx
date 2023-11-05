import { FlatList, Text, View } from 'react-native';
import { useEffect } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { splashState } from '../../../stores/splash-store';

export const SplashUI = ({ route }) => {
  const [ isReady, setIsReady ] = useRecoilState(splashState);
  const navigation = useNavigation();
  const { itemId } = route.params;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SingleCircle', { itemId });
      setIsReady(true);
    }, 4000);
  }, []);
  
  //써클 참여자 더미데이터
  const persons = [
    { id: 1, name: '김' },
    { id: 2, name: '이' },
    { id: 3, name: '박' },
    { id: 4, name: '최' },
  ];
  const ListPersons = ({item}) => {
    return(
      <View style={styles.personCircle}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return(
    <View style={styles.splashContainer}>
      <View style={styles.memberContainer}>
        <FlatList 
          data={persons}
          renderItem={({ item }) => <ListPersons item={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
