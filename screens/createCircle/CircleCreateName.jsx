import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from '../Profile/styles';
import { Alert } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { newCircleState } from '../../stores/circle-store';

const CircleCreateName = ({ navigation }) => {
  const newCircle = useRecoilValue(newCircleState); // recoil 상태 읽기
  const setCircleName = useSetRecoilState(newCircleState);
  const MIN_LENGTH = 2;

  // 로컬 state는 이제 recoil 상태의 현재 값을 초기값으로 사용합니다.
  const [name, setName] = useState(newCircle.name);

  const onPressConfirm = () => {
    if (name.trim().length < MIN_LENGTH) {
      Alert.alert(`써클 이름은 ${MIN_LENGTH}글자 이상이어야 합니다.`);
    } else {
      // Recoil 상태 업데이트
      setCircleName(prevCircle => ({
        ...prevCircle,
        name: name.trim(),
      }));
      navigation.goBack();
    }
  };

  const onPressCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>써클 이름</Text>
      </View>
      <TextInput
        style={styles.longInput}
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="써클 이름"
        maxLength={10}
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

export default CircleCreateName;
