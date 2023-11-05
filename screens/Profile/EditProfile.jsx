import React, { useMemo, useState } from 'react';
import { TextInput, View, Text, Pressable, Alert, Linking } from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles';
import { BottomModal } from '../../components/Modal/Modal';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  useMediaLibraryPermissions,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';

export const EditProfile = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [preUser, setPreUser] = useState(user);

  const [isModalVisible, setModalVisible] = useState(false);

  const [imagePermissionInformation, requestImagePermission] = useMediaLibraryPermissions(); // 미디어 라이브러리 접근 권한
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions(); // 카메라 접근 권한

  async function verifyImagePermissions() {
    if (imagePermissionInformation.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestImagePermission();
      return permissionResponse.granted;
    }

    if (imagePermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('미디어 라이브러리 권한이 필요합니다.', '설정에서 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        { text: '설정으로 이동', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }

    return true;
  }

  async function verifyCameraPermissions() {
    if (cameraPermissionInformation.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('카메라 권한이 필요합니다.', '설정에서 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        { text: '설정으로 이동', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }

    return true;
  }

  async function selectImageHandler() {
    try {
      const hasPermission = await verifyImagePermissions();

      if (!hasPermission) {
        return;
      }

      const image = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!image.canceled) {
        setUser({ ...user, profileImage: image.assets[0].uri });
        setModalVisible(!isModalVisible);
      }
    } catch (error) {
      Alert.alert('미디어 라이브러리를 사용할 수 없습니다.', '다시 시도해주세요.');
      console.log(error);
    }
  }

  async function takeImageHandler() {
    try {
      const hasPermission = await verifyCameraPermissions();

      if (!hasPermission) {
        return;
      }

      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      if (!image.canceled) {
        setUser({ ...user, profileImage: image.assets[0].uri });
        setModalVisible(!isModalVisible);
      }
      // console.log(image);
    } catch (error) {
      Alert.alert('카메라를 사용할 수 없습니다.', '다시 시도해주세요.');
    }
  }

  function deleteImageHandler() {
    setUser({ ...user, profileImage: null });
    setModalVisible(!isModalVisible);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onPressConfirm = () => {
    navigation.navigate('MyPage');
  };
  const onPressCancel = () => {
    setUser(preUser);
    navigation.navigate('MyPage');
  };
  const onPressEditUsername = () => {
    navigation.navigate('EditUsername');
  };
  const onPressEditIntroduction = () => {
    navigation.navigate('EditIntroduction');
  };

  const editButtons = useMemo(
    () => [
      {
        text: '라이브러리에서 선택',
        icon: require('../../assets/icons/Img_box_fill.png'),
        iconStyle: styles.gallery,
        textStyle: {}, // 기본 스타일
        onPress: selectImageHandler,
      },
      {
        text: '사진 찍기',
        icon: require('../../assets/icons/camera.png'),
        iconStyle: styles.camera,
        textStyle: {}, // 기본 스타일
        onPress: takeImageHandler,
      },
      {
        text: '사진 삭제',
        icon: require('../../assets/icons/trash.png'),
        iconStyle: styles.trash,
        textStyle: { color: 'red' }, // 빨간색 텍스트
        onPress: deleteImageHandler,
      },
    ],
    [selectImageHandler, takeImageHandler, deleteImageHandler],
  );

  return (
    <View style={styles.container}>
      <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={editButtons} />
      {user?.profileImage ? (
        <Image source={user?.profileImage} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.noImage} />
        </View>
      )}
      <Pressable style={styles.pinkButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>프로필 편집</Text>
      </Pressable>
      <Pressable onPress={onPressEditUsername}>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>사용자 이름</Text>
          </View>
          <TextInput
            style={styles.input}
            value={user?.username}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="사용자 이름"
            editable={false} // 편집 불가능하게 설정
            pointerEvents="none"
          />
        </View>
      </Pressable>
      <Pressable onPress={onPressEditIntroduction}>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>한줄소개</Text>
          </View>
          <TextInput
            style={styles.input}
            value={user?.introduction}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="한줄소개"
            editable={false} // 편집 불가능하게 설정
            pointerEvents="none"
          />
        </View>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={onPressConfirm}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPressCancel}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};
