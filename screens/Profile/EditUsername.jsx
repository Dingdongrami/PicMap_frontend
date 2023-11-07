import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { styles } from './styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';

export const EditUsername = ({ navigation }) => {
  // Use Recoil hooks for reading and setting user state separately.
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  // Manage the username input with local state.
  const [username, setUsername] = useState(user.username);
  const MIN_LENGTH = 2; // Minimum username length

  const onPressConfirm = () => {
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < MIN_LENGTH) {
      // Alert if username doesn't meet the minimum length requirement.
      Alert.alert(`사용자 이름은 ${MIN_LENGTH}글자 이상이어야 합니다.`);
    } else {
      // Update global state and navigate only if validation passes.
      setUser(prevUser => ({ ...prevUser, username: trimmedUsername }));
      navigation.navigate('EditProfile');
    }
  };

  const onPressCancel = () => {
    // No need to reset global state; just navigate back.
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>사용자 이름</Text>
      </View>
      <TextInput
        style={styles.longInput}
        value={username}
        onChangeText={setUsername} // Update local state only.
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
