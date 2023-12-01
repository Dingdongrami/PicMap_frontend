import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { styles } from './styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';

export const EditIntroduction = ({ navigation }) => {
  // Recoil 상태를 읽기 전용으로 사용합니다.
  const user = useRecoilValue(userState);
  // Recoil 상태를 설정하기 위한 함수만 가져옵니다.
  const setUser = useSetRecoilState(userState);

  // 로컬 상태를 사용하여 사용자의 입력을 관리합니다.
  const [introduce, setIntroduce] = useState(user.introduce);

  const onPressConfirm = () => {
    // 공백 문자만 있거나 빈 문자열이 아닌지 확인합니다.
    if (!introduce.trim()) {
      Alert.alert('한줄소개를 입력해주세요.');
    } else {
      // Recoil 상태를 업데이트합니다.
      setUser(prevUser => ({ ...prevUser, introduce: introduce.trim() }));
      navigation.goBack();
    }
  };

  const onPressCancel = () => {
    // 취소 시에는 변경사항 없이 이전 화면으로 돌아갑니다.
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>한줄소개</Text>
      </View>
      <TextInput
        style={styles.longInput}
        value={introduce}
        onChangeText={setIntroduce} // 직접 로컬 상태를 업데이트합니다.
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="한줄소개"
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
