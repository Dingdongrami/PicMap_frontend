import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { styles as modalStyles } from '../Modal/styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useState } from 'react';

export const CircleMapHeader = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // const toggleUp = () => {
  //   toggleModal();
  // };
  const GoBack = () => {
    navigation.goBack();
  };
  const photoOptions = useMemo(
    () => [
      {
        text: '유저 추가',
        icon: require('../../assets/icons/add_user_icon.png'),
        iconStyle: styles.user_add,
        textStyle: {},
        // onPress:
      },
      {
        text: '유저 정렬',
        icon: require('../../assets/icons/filter_user_icon.png'),
        iconStyle: styles.user_array,
        textStyle: {},
        // onPress
      },
      {
        text: '써클 이름 변경',
        icon: require('../../assets/icons/edit_circle_name.png'),
        iconStyle: styles.circle_name,
        textStyle: {}
        // onPress
      }
    ]
  )
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
          <FontAwesome name="globe" size={24} color={'#44403C'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          {user?.profileImage ? (
            <Image source={user?.profileImage} style={styles.image} contentFit="cover" />
          ) : (
            <FontAwesome name="user-circle-o" style={{ marginLeft: 2 }} size={24} color={'#44403C'} />
          )}
        </TouchableOpacity>
          {/* 드로우모달창 */}
        <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} onPress={photoOptions} />
        <TouchableOpacity>
          <Image source={require('../../assets/icons/circle_array_btn.png')} style={styles.rightHeader} onPress={toggleModal} />
        </TouchableOpacity>
      </View>
    </View>
  );
};