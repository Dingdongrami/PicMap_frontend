import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';

export const EditIntroduction = ({ navigation }) => {
  const [user, setUser] = useRecoilState(userState);
  const [preUserIntroduction, setPreUserIntroduction] = useState(user.introduction);

  const onPressConfirm = () => {
    navigation.navigate('EditProfile');
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
