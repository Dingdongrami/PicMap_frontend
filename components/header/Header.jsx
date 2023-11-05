import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';

export const Header = ({ navigation, title }) => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'IropkeBatang', color: '#44403C' }}>PicMap</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Ionicons name="search-sharp" size={25} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TimeLine')}>
          <FontAwesome name="globe" size={24} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          {user?.profileImage ? (
            <Image source={user?.profileImage} style={styles.image} contentFit="cover" />
          ) : (
            <FontAwesome name="user-circle-o" style={{ marginLeft: 2 }} size={24} color={'#44403C'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
