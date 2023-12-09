import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { s3BaseUrl } from '../../constants/config';
import { TouchableOpacity } from 'react-native';

const PersonRow = ({ user, button, circleId }) => {
  const navigation = useNavigation();

  const onPressUser = () => {
    // console.log(navigation.getState());
    navigation.navigate('UserPage', { user });
  };

  return (
    <View style={styles.personRow}>
      {user?.profileImage ? (
        <Pressable onPress={onPressUser}>
          <Image source={s3BaseUrl + user?.profileImage} style={styles.profileImage} contentFit="cover" />
        </Pressable>
      ) : (
        <View style={styles.personWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.defaultImage} contentFit="contain" />
        </View>
      )}
      <Pressable onPress={onPressUser}>
        <Text style={styles.username}>{user?.nickname}</Text>
      </Pressable>
      {button && (
        <TouchableOpacity onPress={button?.onPress} style={styles.buttonWrapper}>
          <Image source={button.icon} style={[styles.button, button.style]} contentFit="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PersonRow;
