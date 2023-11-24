import React, { useCallback, useMemo, useState } from 'react';
import { TextInput, View, Text, Pressable, Alert, Linking, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles';
import { BottomModal } from '../../components/Modal';
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
import Checkbox from 'expo-checkbox';

export const EditProfile = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  // Profile image is now a local state
  const [profileImage, setProfileImage] = useState(user.profileImage);

  const [isModalVisible, setModalVisible] = useState(false);

  // Combine permission states into one state object
  const [imagePermission, requestImagePermission] = useMediaLibraryPermissions();
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();

  // Combine permission checks into one function
  async function verifyPermissions(permissionInfo, requestPermissionFunc) {
    if (permissionInfo.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestPermissionFunc();
      if (permissionResponse.status === PermissionStatus.DENIED) {
        Alert.alert('권한이 필요합니다.', '설정에서 권한을 허용해주세요.', [
          { text: '취소', style: 'cancel' },
          { text: '설정으로 이동', onPress: () => Linking.openSettings() },
        ]);
      }
      return permissionResponse.granted;
    }
    return true;
  }

  // Refactor image selection to use local state and then update Recoil on confirm
  async function selectImageHandler() {
    const hasPermission = await verifyPermissions(imagePermission, requestImagePermission);
    if (!hasPermission) return;

    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!image.canceled) {
      setProfileImage(image.assets[0].uri); // Update local state with image uri from assets array
      setModalVisible(false);
    }
  }

  // Refactor camera usage to use local state and then update Recoil on confirm
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions(cameraPermission, requestCameraPermission);
    if (!hasPermission) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // Adjust the aspect ratio if needed
      quality: 0.5,
    });

    if (!image.canceled) {
      setProfileImage(image.assets[0].uri); // Update local state with image uri from assets array
      setModalVisible(false);
    }
  }

  const deleteImageHandler = useCallback(() => {
    setProfileImage(null); // Update local state
    setModalVisible(false);
  }, []);

  const toggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const onPressConfirm = useCallback(() => {
    setUser({ ...user, profileImage }); // Update Recoil state with new profile image
    navigation.goBack();
  }, [user, profileImage, setUser, navigation]);

  const onPressCancel = useCallback(() => {
    setProfileImage(user.profileImage); // Reset local state to initial Recoil state
    navigation.goBack();
  }, [user, navigation]);

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
        textStyle: { color: '#E53A40' }, // 빨간색 텍스트
        onPress: deleteImageHandler,
      },
    ],
    [selectImageHandler, takeImageHandler, deleteImageHandler],
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFF' }}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}>
      <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={editButtons} />
      {profileImage ? (
        <Image source={profileImage} style={styles.image} contentFit="cover" />
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
      <Pressable>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>공개 여부</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
              value={user?.public}
              onValueChange={newValue => setUser({ ...user, public: newValue })}
              color={user?.public ? '#D6D3D1' : undefined} // 색상은 원하는 대로 설정 가능
              style={{ margin: 8, borderColor: '#D6D3D1', borderWidth: 1 }}
            />
            <Text style={styles.label}>공개</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 28 }}>
            <Checkbox
              value={!user?.public}
              onValueChange={newValue => setUser({ ...user, public: !newValue })}
              color={!user?.public ? '#D6D3D1' : undefined} // 색상은 원하는 대로 설정 가능
              style={{ margin: 8, borderColor: '#D6D3D1', borderWidth: 1 }}
            />
            <Text style={styles.label}>비공개</Text>
          </View>
        </View>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={onPressConfirm}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPressCancel}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </ScrollView>
  );
};
