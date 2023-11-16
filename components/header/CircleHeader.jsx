import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { useState, useMemo } from 'react';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { BottomModal } from '../Modal/Modal';

export const CircleHeader = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const navigation = useNavigation();
  const userArray = async() => {

  };
  const circleEdit = async() => {
    Alert.alert('써클 이름 변경', [
      // { text: '취소', style: 'cancel'}
    ])
  }
  const photoOptions = useMemo(
    () => [
      {
        text: '유저 추가',
        icon: require('../../assets/icons/add_user_icon.png'),
        iconStyle: styles.user_add,
        textStyle: {},
        // onPress:
      },
      //정렬맞춤을 위해 한칸띄움
      {
        text: ' 유저 정렬',
        icon: require('../../assets/icons/filter_user_icon.png'),
        iconStyle: styles.user_array,
        textStyle: {},
        // onPress
      },
      {
        text: '써클 이름 변경',
        icon: require('../../assets/icons/edit_circle_name.png'),
        iconStyle: styles.circle_name,
        textStyle: {},
        onPress: circleEdit
      }
    ]
  );
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
        <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={photoOptions} />
        <TouchableOpacity onPress={toggleModal}>
          <View style={{height: 24, justifyContent: 'center' }}>
            <Image source={require('../../assets/icons/circle_array_btn.png')} style={styles.rightHeader} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};