import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { useState, useMemo } from 'react';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { NestedModal } from '../Modal/NestedModal';
import { CircleModal } from '../Modal/CircleModal';
import { EditModal } from '../Modal/EditModal';
import HeaderIcon from './HeaderIcon';

const CircleHeader = ({ circleId, photoSortMutation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNestedVisible, setNestedVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const nestedToggle = () => {
    setNestedVisible(!isNestedVisible);
  };
  const userArray = () => {
    setModalVisible(false);
    setTimeout(() => {
      setNestedVisible(true);
    }, 500);
  };

  const userPlus = () => {
    setModalVisible(false);
    navigation.navigate('InviteUser');
  };

  const circleEdit = async () => {
    setModalVisible(false);
    setTimeout(() => {
      setEditVisible(true);
    }, 500);
  };

  const photoOptions = useMemo(() => [
    {
      text: '유저 추가',
      icon: require('../../assets/icons/add_user_icon.png'),
      iconStyle: styles.user_add,
      textStyle: {},
      onPress: userPlus,
    },
    //정렬맞춤을 위해 한칸띄움
    {
      text: ' 사진 정렬',
      icon: require('../../assets/icons/filter_user_icon.png'),
      iconStyle: styles.user_array,
      textStyle: {},
      onPress: userArray,
    },
    {
      text: '써클 이름 변경',
      icon: require('../../assets/icons/edit_circle_name.png'),
      iconStyle: styles.circle_name,
      textStyle: {},
      onPress: circleEdit,
    },
  ]);

  const sortOptions = useMemo(() => [
    {
      text: '최신 순',
      icon: require('../../assets/icons/check_btn.png'),
      iconStyle: styles.circle_name,
      defaultIconStyle: styles.circle_none,
      textStyle: {},
      onPress: () => photoSortMutation.mutate({ circleId, sortType: 'latest' }),
    },
    {
      text: '과거 순',
      icon: require('../../assets/icons/check_btn.png'),
      iconStyle: styles.circle_name,
      defaultIconStyle: styles.circle_none,
      textStyle: {},
      onPress: () => photoSortMutation.mutate({ circleId, sortType: 'oldest' }),
    },
    {
      text: '좋아요 순',
      icon: require('../../assets/icons/check_btn.png'),
      iconStyle: styles.circle_name,
      defaultIconStyle: styles.circle_none,
      textStyle: {},
      onPress: () => photoSortMutation.mutate({ circleId, sortType: 'like' }),
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'IropkeBatang', color: '#44403C' }}>PicMap</Text>
      <View style={styles.iconContainer}>
        <HeaderIcon />
        <CircleModal
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          buttons={photoOptions}
          onDismiss={() => setModalVisible(false)}
        />
        {isNestedVisible && (
          <NestedModal isModalVisible={isNestedVisible} toggleModal={nestedToggle} buttons={sortOptions} />
        )}
        {isEditVisible && <EditModal isModalVisible={isEditVisible} />}
        <TouchableOpacity onPress={toggleModal}>
          <View style={{ height: 24, justifyContent: 'center' }}>
            <Image source={require('../../assets/icons/circle_array_btn.png')} style={styles.rightHeader} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircleHeader;
