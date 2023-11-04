import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Alert } from 'react-native';

export const EditIntroduction = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [preUserIntroduction, setPreUserIntroduction] = useState(user.introduction);

  const onPressConfirm = () => {
    // 공백 문자만 있거나 빈 문자열이 아닌지 확인합니다.
    if (!user.introduction.trim()) {
      Alert.alert('한줄소개를 입력해주세요.');
    } else {
      setUser({ ...user, introduction: user.introduction.trim() });
      navigation.navigate('EditProfile');
    }
  };

  const onPressCancel = () => {
    setUser({ ...user, introduction: preUserIntroduction });
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>한줄소개</Text>
      </View>
      <TextInput
        style={styles.longInput}
        value={user.introduction}
        onChangeText={text => setUser({ ...user, introduction: text })}
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
