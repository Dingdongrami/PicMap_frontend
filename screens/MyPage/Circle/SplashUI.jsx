import { FlatList, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { useEffect } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { userState } from '../../../stores/user-store';
import { splashState } from '../../../stores/splash-store';
import { useQuery } from '@tanstack/react-query';
import { fetchMembers } from '../../../api/circleApi';
import { s3BaseUrl } from '../../../constants/config';

export const SplashUI = ({ route }) => {
  const [isReady, setIsReady] = useRecoilState(splashState);
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const { circleId } = route.params;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circleMembers', circleId],
    queryFn: () => fetchMembers(circleId),
  });

  const displayPerson = data ? (data.length > 4 ? data.slice(0, 4) : data) : [];
  const countOther = data ? data.length - 1 : 0;

  const ListPersons = ({ person }) => {
    return (
      <View style={styles.personCircle}>
        {person?.profileImage ? (
          <Image source={s3BaseUrl + person?.profileImage} style={styles.personImage} contentFit="cover" />
        ) : (
          <Text style={[styles.splashText, { marginTop: 0 }]}>{person?.nickname}</Text>
        )}
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SingleCircle', { circleId });
      setIsReady(true);
    }, 2000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <View style={styles.memberContainer}>
        <FlatList
          data={displayPerson}
          renderItem={({ item }) => <ListPersons person={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}
        />
      </View>
      <Text style={styles.splashText}>
        {data && data[0].nickname}님 외 {countOther}명이 있습니다.
      </Text>
      {/*애니메이션 추가 구현 필요 */}
      <Image source={require('../../../assets/icons/loading.png')} style={styles.splashImage} />
    </View>
  );
};
