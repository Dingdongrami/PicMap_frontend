import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';

export const EditUsername = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [preUsername, setPreUsername] = useState(user.username);
  const MIN_LENGTH = 2; // 최소 글자 수 설정

  const onPressConfirm = () => {
    if (user.username.trim().length < MIN_LENGTH) {
      // 글자 수가 충분하지 않을 때 경고
      Alert.alert(`사용자 이름은 ${MIN_LENGTH}글자 이상이어야 합니다.`);
    } else {
      // 유효성 검사를 통과했을 때만 EditProfile로 네비게이션
      navigation.navigate('EditProfile');
    }
  };

  const onPressCancel = () => {
    setUser({ ...user, username: preUsername });
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>사용자 이름</Text>
      </View>
      <TextInput
        style={styles.longInput}
        value={user.username}
        onChangeText={text => setUser({ ...user, username: text.trim() })}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="사용자 이름"
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
