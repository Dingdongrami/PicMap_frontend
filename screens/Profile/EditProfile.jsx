import React, { useCallback, useMemo, useState } from 'react';
import { TextInput, View, Text, Pressable, Alert, Linking, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { styles } from './styles';
import { BottomModal } from '../../components/Modal';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import Checkbox from 'expo-checkbox';
import useCamera from '../../hooks/useCamera';
import useMediaLibrary from '../../hooks/useMediaLibrary';
import { s3BaseUrl } from '../../constants/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateUser, updateUserProfileImage, updateUserProfileNoImage } from '../../api/userApi';

export const EditProfile = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [isModalVisible, setModalVisible] = useState(false);

  // 써클 썸네일 업로드를 위한 함수
  const { selectImageHandler } = useMediaLibrary(onImageSelected);
  const { takeImageHandler } = useCamera(onImageCaptured);

  const queryClient = useQueryClient();

  // 유저 정보를 가져오는 쿼리
  const { data } = useQuery({
    queryKey: ['user', 17],
    queryFn: () => fetchUser(17),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
  // 유저 정보를 업데이트하는 뮤테이션
  const userMutate = useMutation({
    mutationFn: args => updateUser(args.userId, args.userData),
    onSuccess: data => {
      setUser({ ...data, public: data.status === 'PUBLIC' });
      queryClient.invalidateQueries('user');
    },
  });
  // 유저 프로필 이미지를 업데이트하는 뮤테이션
  const userProfileMutate = useMutation({
    mutationFn: args => updateUserProfileImage(args.userId, args.userProfileImage),
    onSuccess: data => {
      setUser({ ...data, public: data.status === 'PUBLIC' });
      queryClient.invalidateQueries('user');
    },
    onError: error => {
      Alert.alert('프로필 이미지 업로드에 실패했습니다.');
    },
  });
  // 유저 프로필 이미지가 null일 때 뮤테이션
  const userProfileNullMutate = useMutation({
    mutationFn: args => updateUserProfileNoImage(args.userId),
    onSuccess: data => {
      setUser({ ...data, public: data.status === 'PUBLIC' });
      queryClient.invalidateQueries('user');
    },
    onError: error => {
      Alert.alert('프로필 이미지 업로드에 실패했습니다.');
    },
  });

  // 이미지 선택이 완료되면 실행되는 함수 - 호이스팅을 위해 함수 선언식으로 작성
  function onImageSelected(photo) {
    console.log('photo', photo);
    setUser({ ...user, profileImage: photo[0].uri });
    setModalVisible(!isModalVisible);
  }

  // 이미지 캡쳐가 완료되면 실행되는 함수 - 호이스팅을 위해 함수 선언식으로 작성
  function onImageCaptured(photoUri) {
    setUser({ ...user, profileImage: photoUri });
    setModalVisible(!isModalVisible);
  }

  const onDeleteImage = () => {
    setUser({ ...user, profileImage: null });
    setModalVisible(false);
  };

  const onToggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressConfirm = () => {
    userMutate.mutate({ userId: user.id, userData: { ...user, status: user.public ? 'PUBLIC' : 'PRIVATE' } });
    if (!user.profileImage) {
      userProfileNullMutate.mutate({ userId: user.id });
    } else {
      userProfileMutate.mutate({ userId: user.id, userProfileImage: user.profileImage });
    }
    navigation.goBack();
  };

  const onPressCancel = () => {
    setUser({ ...data, public: data.status === 'PUBLIC' });
    navigation.goBack();
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
        textStyle: { color: '#E53A40' }, // 빨간색 텍스트
        onPress: onDeleteImage,
      },
    ],
    [selectImageHandler, takeImageHandler, onDeleteImage],
  );

  console.log('user', user);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFF' }}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}>
      <BottomModal isModalVisible={isModalVisible} onToggleModal={onToggleModal} buttons={editButtons} />
      {user.profileImage ? (
        <Image
          source={user.profileImage.slice(0, 4) === 'file' ? { uri: user.profileImage } : s3BaseUrl + user.profileImage}
          style={styles.image}
          contentFit="cover"
        />
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
            value={user?.nickname}
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
            value={user?.introduce}
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
