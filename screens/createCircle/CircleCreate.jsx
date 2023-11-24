import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, Linking } from 'react-native';
import { Image } from 'expo-image';
import { BottomModal } from '../../components/Modal';
import { styles } from '../Profile/styles';
import Checkbox from 'expo-checkbox';
import {
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
  MediaTypeOptions,
  launchImageLibraryAsync,
  launchCameraAsync,
} from 'expo-image-picker';
import { useRecoilState } from 'recoil';
import { newCircleState } from '../../stores/circle-store';
import { ScrollView } from 'react-native';
import instance, { circleInstance } from '../../api/instance';

const CircleCreate = () => {
  const [newCircle, setNewCircle] = useRecoilState(newCircleState);
  const [isModalVisible, setModalVisible] = useState(false);

  const [imagePermissionInformation, requestImagePermission] = useMediaLibraryPermissions(); // 미디어 라이브러리 접근 권한
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions(); // 카메라 접근 권한

  const navigation = useNavigation();

  const createCircle = async () => {
    try {
      const data = await circleInstance.post('/add-circle', {
        userid: 15,
        name: newCircle.name,
        description: newCircle.description,
        status: newCircle.public ? 'PUBLIC' : 'PRIVATE',
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        setNewCircle({ ...newCircle, image: image.assets[0].uri });
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
        setNewCircle({ ...newCircle, image: image.assets[0].uri });
        setModalVisible(!isModalVisible);
      }
      // console.log(image);
    } catch (error) {
      Alert.alert('카메라를 사용할 수 없습니다.', '다시 시도해주세요.');
    }
  }

  function deleteImageHandler() {
    setNewCircle({ ...newCircle, image: null });
    setModalVisible(!isModalVisible);
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onPressConfirm = () => {
    createCircle();
    navigation.goBack();
  };
  const onPressCancel = () => {
    setNewCircle(prev => ({ name: '', description: '', public: true, image: null }));
    navigation.goBack();
  };
  const onPressCircleName = () => {
    navigation.navigate('CircleCreateName');
  };
  const onPressCircleDesc = () => {
    navigation.navigate('CircleCreateDesc');
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
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFF' }}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}>
      <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={editButtons} />
      {newCircle.image ? (
        <Image source={newCircle.image} style={[styles.image, { borderRadius: 20 }]} contentFit="cover" />
      ) : (
        <View style={[styles.noImageWrapper, { borderRadius: 20 }]}>
          <Image
            source={require('../../assets/icons/image.png')}
            style={[styles.noImage, { width: 65 }]}
            contentFit="contain"
          />
        </View>
      )}
      <Pressable style={styles.pinkButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>사진 등록</Text>
      </Pressable>
      <Pressable onPress={onPressCircleName}>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>써클 이름</Text>
          </View>
          <TextInput
            style={styles.input}
            value={newCircle?.name}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="써클 이름"
            editable={false} // 편집 불가능하게 설정
            pointerEvents="none"
          />
        </View>
      </Pressable>
      <Pressable onPress={onPressCircleDesc}>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>써클 소개</Text>
          </View>
          <TextInput
            style={styles.input}
            value={newCircle?.description}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="써클 소개"
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
              value={newCircle?.public}
              onValueChange={newValue => setNewCircle({ ...newCircle, public: newValue })}
              color={newCircle?.public ? '#D6D3D1' : undefined} // 색상은 원하는 대로 설정 가능
              style={{ margin: 8, borderColor: '#D6D3D1', borderWidth: 1 }}
            />
            <Text style={styles.label}>공개</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 28 }}>
            <Checkbox
              value={!newCircle?.public}
              onValueChange={newValue => setNewCircle({ ...newCircle, public: !newValue })}
              color={!newCircle?.public ? '#D6D3D1' : undefined} // 색상은 원하는 대로 설정 가능
              style={{ margin: 8, borderColor: '#D6D3D1', borderWidth: 1 }}
            />
            <Text style={styles.label}>비공개</Text>
          </View>
        </View>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={onPressConfirm}>
        <Text style={styles.label}>등록</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPressCancel}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </ScrollView>
  );
};

export default CircleCreate;
