import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const PersonRow = ({ user, button }) => {
  const navigation = useNavigation();

  const onPressUser = () => {
    // console.log(navigation.getState());
    navigation.navigate('UserPage', { user });
  };

  return (
    <View style={styles.personRow}>
      {user.profileImage ? (
        <Image source={user.profileImage} style={styles.profileImage} contentFit="cover" />
      ) : (
        <View style={styles.personWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.defaultImage} contentFit="contain" />
        </View>
      )}
      <Pressable onPress={onPressUser}>
        <Text style={styles.username}>{user.nickname}</Text>
      </Pressable>
      {button && (
        <Pressable onPress={button?.onPress} style={styles.buttonWrapper}>
          <Image source={button.icon} style={[styles.button, button.style]} contentFit="contain" />
        </Pressable>
      )}
    </View>
  );
};

export default PersonRow;
