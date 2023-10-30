import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native';
import { Pressable } from 'react-native';

export const EditUsername = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('EditProfile');
  };
  return (
    <View style={styles.container}>
      <View style={styles.lightLabelWrapper}>
        <Text style={styles.lightLabel}>사용자 이름</Text>
      </View>
      <TextInput style={styles.longInput} autoCapitalize="none" autoCorrect={false} placeholder="사용자 이름" />
      <Pressable style={styles.saveButton} onPress={onPress}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPress}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};
