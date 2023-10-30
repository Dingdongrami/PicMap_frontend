import React from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { styles } from './styles';

export const EditIntroduction = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('EditProfile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>한줄소개</Text>
      </View>
      <TextInput style={styles.longInput} autoCapitalize="none" autoCorrect={false} placeholder="한줄소개" />
      <Pressable style={styles.saveButton} onPress={onPress}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPress}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};
