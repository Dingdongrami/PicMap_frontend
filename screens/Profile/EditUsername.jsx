import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';

export const EditUsername = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [preUsername, setPreUsername] = useState(user.username);

  const onPressConfirm = () => {
    navigation.navigate('EditProfile');
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
        onChangeText={text => setUser({ ...user, username: text })}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="사용자 이름"
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
