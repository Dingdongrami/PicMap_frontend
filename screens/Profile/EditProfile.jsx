import React from 'react';
import { TextInput } from 'react-native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export const EditProfile = ({ navigation }) => {
  const onPress = () => {
    navigation.navigate('MyPage');
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <Pressable style={styles.pinkButton}>
        <Text style={styles.buttonText}>프로필 편집</Text>
      </Pressable>
      <View style={styles.wrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>사용자 이름</Text>
        </View>
        <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder="사용자 이름" />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>한줄소개</Text>
        </View>
        <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} placeholder="한줄소개" />
      </View>
      <Pressable style={styles.saveButton} onPress={onPress}>
        <Text style={styles.label}>완료</Text>
      </Pressable>
      <Pressable style={styles.cancelButton} onPress={onPress}>
        <Text style={styles.label}>취소</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // 가로축
    backgroundColor: '#fff',
  },
  image: {
    borderRadius: 500,
    width: 290,
    height: 290,
    marginTop: 20,
    marginBottom: 14,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  pinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: 'auto',
    backgroundColor: '#FFECEA',
    marginBottom: 27,
  },
  buttonText: {
    fontFamily: 'IropkeBatang',
    fontSize: 14,
    color: '#44403C',
  },
  wrapper: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelWrapper: {
    width: 85,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  label: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
    color: '#44403C',
  },
  input: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 202,
    height: 40,
    fontFamily: 'IropkeBatang',
    fontSize: 14,
    color: '#44403C',
    borderBottomColor: '#D6D3D1',
    borderBottomWidth: 0.5,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#78716C',
    borderWidth: 0.5,
    width: 312,
    height: 60,
    borderRadius: 7,
    backgroundColor: '#FFECEA',
    marginTop: 30,
    marginBottom: 10,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#78716C',
    borderWidth: 0.5,
    width: 312,
    height: 60,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
});
