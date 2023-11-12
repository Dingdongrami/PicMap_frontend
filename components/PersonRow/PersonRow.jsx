import { Image } from 'expo-image';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const PersonRow = ({ profileImage, user, button }) => {
  const navigation = useNavigation();

  const onPressUser = () => {
    console.log(navigation.getState());
    navigation.navigate('UserPage', { user });
  };

  return (
    <View style={styles.personRow}>
      {profileImage ? (
        <Image source={profileImage} style={styles.profileImage} contentFit="cover" />
      ) : (
        <View style={styles.personWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.defaultImage} contentFit="contain" />
        </View>
      )}
      <Pressable onPress={onPressUser}>
        <Text style={styles.username}>{user.username}</Text>
      </Pressable>
      {button && (
        <Pressable onPress={button?.onPress}>
          <Image source={button.icon} style={button.style} contentFit="contain" />
        </Pressable>
      )}
    </View>
  );
};

export default PersonRow;
