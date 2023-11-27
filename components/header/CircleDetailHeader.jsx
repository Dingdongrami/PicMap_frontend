import { View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

const CircleDetailHeader = ({ onPress }) => {
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();
  const GoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GoBack}>
        <Image source={require('../../assets/icons/header_back.png')} style={styles.backHeader} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-sharp" size={25} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TimeLine')}>
          <FontAwesome name="globe" size={26} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          {user?.profileImage ? (
            <Image source={user?.profileImage} style={styles.image} contentFit="cover" />
          ) : (
            <FontAwesome name="user-circle-o" style={{ marginLeft: 2 }} size={24} color={'#44403C'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
          <Image source={require('../../assets/icons/circle_array_btn.png')} style={styles.rightHeader} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircleDetailHeader;
