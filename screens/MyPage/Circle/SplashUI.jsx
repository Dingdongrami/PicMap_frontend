import { FlatList, Text, View, Image } from 'react-native';
import { useEffect } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userState } from '../../../stores/user-store';
import { splashState } from '../../../stores/splash-store';

export const SplashUI = ({ route }) => {
  const [isReady, setIsReady] = useRecoilState(splashState);
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const { circleId } = route.params;
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SingleCircle', { circleId });
      setIsReady(true);
    }, 3000);
  }, []);

  //써클 참여자 더미데이터
  //여기서 써클 참여자라도 API 받아오는게 편리하지 않을까?
  const persons = [
    { id: 1, name: '김' },
    { id: 2, name: '이' },
    { id: 3, name: '박' },
    { id: 4, name: '최' },
    { id: 5, name: '양' },
    { id: 6, name: '우' },
    { id: 7, name: '행' },
    { id: 8, name: '허' },
    { id: 9, name: '장' },
  ];
  const displayPerson = persons.slice(0, 4);
  const countOther = persons.length - 1;

  const ListPersons = ({ item }) => {
    return (
      <View style={styles.personCircle}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.splashContainer}>
      <View style={styles.memberContainer}>
        <FlatList
          data={displayPerson}
          renderItem={({ item }) => <ListPersons item={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Text style={styles.splashText}>
        {user.username}님 외 {countOther}명이 있습니다.
      </Text>
      {/*애니메이션 추가 구현 필요 */}
      <Image source={require('../../../assets/icons/loading.png')} style={styles.splashImage} />
    </View>
  );
};
