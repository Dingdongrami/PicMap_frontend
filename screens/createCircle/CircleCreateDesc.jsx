import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from '../Profile/styles';
import { Alert } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { newCircleState } from '../../stores/circle-store';

const CircleCreateDesc = ({ navigation }) => {
  // 전역 상태를 읽기만 합니다.
  const newCircle = useRecoilValue(newCircleState);

  // 전역 상태를 설정하는 함수만 가져옵니다.
  const setCircleDescription = useSetRecoilState(newCircleState);

  // 로컬 상태를 사용하여 TextInput을 관리합니다.
  const [description, setDescription] = useState(newCircle.description);

  const onPressConfirm = () => {
    if (!description.trim()) {
      Alert.alert('써클 소개를 입력해주세요.');
    } else {
      setCircleDescription(prevState => ({ ...prevState, description: description.trim() }));
      navigation.goBack();
    }
  };

  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>써클 소개</Text>
      </View>
      <TextInput
        style={styles.longInput}
        value={description}
        onChangeText={setDescription}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="써클 소개"
        maxLength={20}
      />
      <Pressable style={styles.saveButton} onPress={onPressConfirm}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPressCancel}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};

export default CircleCreateDesc;
