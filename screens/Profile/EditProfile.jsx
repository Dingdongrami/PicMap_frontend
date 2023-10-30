import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';

export const EditProfile = ({ navigation }) => {
  const onPressMyPage = () => {
    navigation.navigate('MyPage');
  };
  const onPressEditUsername = () => {
    navigation.navigate('EditUsername');
  };
  const onPressEditIntroduction = () => {
    navigation.navigate('EditIntroduction');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <Pressable style={styles.pinkButton}>
        <Text style={styles.buttonText}>프로필 편집</Text>
      </Pressable>
      <Pressable onPress={onPressEditUsername}>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>사용자 이름</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="사용자 이름"
            editable={false} // 편집 불가능하게 설정
            pointerEvents="none"
          />
        </View>
      </Pressable>
      <Pressable onPress={onPressEditIntroduction}>
        <View style={styles.wrapper}>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>한줄소개</Text>
          </View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="한줄소개"
            editable={false} // 편집 불가능하게 설정
            pointerEvents="none"
          />
        </View>
      </Pressable>
      <Pressable style={styles.saveButton} onPress={onPressMyPage}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPressMyPage}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};
