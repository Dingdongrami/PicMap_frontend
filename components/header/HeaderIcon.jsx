import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/userApi';
import { s3BaseUrl } from '../../constants/config';

const HeaderIcon = () => {
  const navigation = useNavigation();
  const { data } = useQuery({
    queryKey: ['user', 17],
    queryFn: () => fetchUser(17),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-sharp" size={25} color={'#44403C'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TimeLine')}>
        <FontAwesome name="globe" size={26} color={'#44403C'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
        {data?.profileImage ? (
          <Image source={s3BaseUrl + data?.profileImage} style={styles.image} contentFit="cover" />
        ) : (
          <FontAwesome name="user-circle-o" style={{ marginLeft: 2 }} size={24} color={'#44403C'} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default HeaderIcon;
