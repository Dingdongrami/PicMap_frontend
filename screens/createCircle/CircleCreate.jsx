import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, Linking } from 'react-native';
import { Image } from 'expo-image';
import { BottomModal } from '../../components/Modal';
import { styles } from '../Profile/styles';
import Checkbox from 'expo-checkbox';
import { useRecoilState } from 'recoil';
import { newCircleState } from '../../stores/circle-store';
import { ScrollView } from 'react-native';
import instance, { circleInstance } from '../../api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCircle } from '../../api/circleApi';
import useCamera from '../../hooks/useCamera';
import useMediaLibrary from '../../hooks/useMediaLibrary';

const CircleCreate = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createCircle,
    onSuccess: data => {
      queryClient.invalidateQueries('circle');
    },
  });
  const [newCircle, setNewCircle] = useRecoilState(newCircleState);
  const [isModalVisible, setModalVisible] = useState(false);

  // 써클 썸네일 업로드를 위한 함수
  const { selectImageHandler } = useMediaLibrary(onImageSelected);
  const { takeImageHandler } = useCamera(onImageCaptured);

  // 이미지 선택이 완료되면 실행되는 함수 - 호이스팅을 위해 함수 선언식으로 작성
  function onImageSelected(photo) {
    setNewCircle({ ...newCircle, thumbnail: photo[0].uri });
    setModalVisible(!isModalVisible);
  }

  // 이미지 캡쳐가 완료되면 실행되는 함수 - 호이스팅을 위해 함수 선언식으로 작성
  function onImageCaptured(photo) {
    setNewCircle({ ...newCircle, thumbnail: photo.uri });
    setModalVisible(!isModalVisible);
  }

  const onDeleteThumbnail = () => {
    setNewCircle({ ...newCircle, thumbnail: null });
    setModalVisible(!isModalVisible);
  };

  const onToggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onPressConfirm = () => {
    mutate(newCircle);
    setNewCircle({ name: '', description: '', public: true, image: null });
    navigation.goBack();
  };
  const onPressCancel = () => {
    setNewCircle({ name: '', description: '', public: true, image: null });
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
        onPress: onDeleteThumbnail,
      },
    ],
    [selectImageHandler, takeImageHandler, onDeleteThumbnail],
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#FFF' }}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}>
      <BottomModal isModalVisible={isModalVisible} onToggleModal={onToggleModal} buttons={editButtons} />
      {newCircle.thumbnail ? (
        <Image source={newCircle.thumbnail} style={[styles.image, { borderRadius: 20 }]} contentFit="cover" />
      ) : (
        <View style={[styles.noImageWrapper, { borderRadius: 20 }]}>
          <Image
            source={require('../../assets/icons/image.png')}
            style={[styles.noImage, { width: 65 }]}
            contentFit="contain"
          />
        </View>
      )}
      <Pressable style={styles.pinkButton} onPress={onToggleModal}>
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
