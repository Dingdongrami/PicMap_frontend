import React, { useEffect, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { BottomModal } from '../../components/Modal/Modal';

export const EditProfile = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onPressMyPage = () => {
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
        onPress: () => {
          // 라이브러리 선택 기능 구현
        },
      },
      {
        text: '사진 찍기',
        icon: require('../../assets/icons/camera.png'),
        iconStyle: styles.camera,
        textStyle: {}, // 기본 스타일
        onPress: () => {
          // 사진 찍기 기능 구현
        },
      },
      {
        text: '사진 삭제',
        icon: require('../../assets/icons/trash.png'),
        iconStyle: styles.trash,
        textStyle: { color: 'red' }, // 빨간색 텍스트
        onPress: () => {
          // 사진 삭제 기능 구현
        },
      },
    ],
    [],
  );

  return (
    <View style={styles.container}>
      <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={editButtons} />
      <Image style={styles.image} />
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
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="한줄소개"
            editable={false} // 편집 불가능하게 설정
            pointerEvents="none"
          />
        </View>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={onPressMyPage}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPressMyPage}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};
