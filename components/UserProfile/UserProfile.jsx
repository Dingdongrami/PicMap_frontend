import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../MyProfile/styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';
import { useState } from 'react';
import CustomToast from '../CustomToast';
import { s3BaseUrl } from '../../constants/config';

const UserProfile = ({ user, onPressFriendRequest }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const onPressRequest = () => {
    // TODO: 친구요청 로직을 여기에 추가하세요.
    // 친구요청 중인 상태를 전역 상태로 관리하세요.

    // 친구요청 로직이 성공했다고 가정하고 토스트 메시지를 띄웁니다.
    setToastMessage('친구 요청 완료');
    setShowToast(true);
  };

  return (
    <View style={styles.profileContainer}>
      {user.profileImage ? (
        <Image source={s3BaseUrl + user.profileImage} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.noImage} />
        </View>
      )}
      <View style={styles.rightWrapper}>
        <View style={styles.iconTextWrapper}>
          <Image source={require('../../assets/icons/private.png')} style={styles.privateImage} />
          <Text style={styles.usernameText}>{user.nickname}</Text>
        </View>
        <Text style={styles.onelineText}>{user.introduce}</Text>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.pinkButton} onPress={onPressRequest}>
            <Image source={require('../../assets/icons/person_add.png')} style={styles.friendsImage} />
            <Text style={styles.buttonText}>{showToast ? '친구 요청 중' : '친구 요청'}</Text>
          </Pressable>
        </View>
      </View>
      <CustomToast text={toastMessage} show={showToast} />
    </View>
  );
};

export default UserProfile;
