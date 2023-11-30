import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { s3BaseUrl } from '../../constants/config';

const HeaderIcon = () => {
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search-sharp" size={25} color={'#44403C'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TimeLine')}>
        <FontAwesome name="globe" size={26} color={'#44403C'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
        {user.profileImage ? (
          <Image source={s3BaseUrl + user.profileImage} style={styles.image} contentFit="cover" />
        ) : (
          <FontAwesome name="user-circle-o" style={{ marginLeft: 2 }} size={24} color={'#44403C'} />
        )}
      </TouchableOpacity>
    </>
  );
};

export default HeaderIcon;
