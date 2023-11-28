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
import useCamera from '../../hooks/useCamera';
import useMediaLibrary from '../../hooks/useMediaLibrary';

export const EditProfile = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [isModalVisible, setModalVisible] = useState(false);

  // 써클 썸네일 업로드를 위한 함수
  const { selectImageHandler } = useMediaLibrary(onImageCaptured);
  const { takeImageHandler } = useCamera(onImageCaptured);

  // 이미지 캡쳐가 완료되면 실행되는 함수 - 호이스팅을 위해 함수 선언식으로 작성
  function onImageCaptured(uri) {
    setUser({ ...user, profile: uri });
    setModalVisible(!isModalVisible);
  }

  const onDeleteImage = useCallback(() => {
    setUser({ ...user, profile: null });
    setModalVisible(false);
  }, []);

  const onToggleModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const onPressConfirm = useCallback(() => {
    setUser(user);
    navigation.goBack();
  }, [user, user.profile, setUser, navigation]);

  const onPressCancel = useCallback(() => {
    setUser({ ...user, profile: null });
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
        onPress: onDeleteImage,
      },
    ],
    [selectImageHandler, takeImageHandler, onDeleteImage],
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFF' }}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}>
      <BottomModal isModalVisible={isModalVisible} onToggleModal={onToggleModal} buttons={editButtons} />
      {user.profile ? (
        <Image source={user.profile} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.noImage} />
        </View>
      )}
      <Pressable style={styles.pinkButton} onPress={onToggleModal}>
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
