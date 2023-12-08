import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { s3BaseUrl } from '../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/userApi';
import { useQueryClient } from '@tanstack/react-query';
import { TouchableOpacity } from 'react-native';

const PersonRow = ({ user, button }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ['friend', user?.requesterId],
    queryFn: () => fetchUser(user.requesterId),
    select: data => data,
    enabled: !!user,
  });

  const onPressUser = () => {
    // console.log(navigation.getState());
    navigation.navigate('UserPage', { user: data });
  };

  return (
    <View style={styles.personRow}>
      {data?.profileImage ? (
        <Pressable onPress={onPressUser}>
          <Image source={s3BaseUrl + data?.profileImage} style={styles.profileImage} contentFit="cover" />
        </Pressable>
      ) : (
        <View style={styles.personWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.defaultImage} contentFit="contain" />
        </View>
      )}
      <Pressable onPress={onPressUser}>
        <Text style={styles.username}>{data?.nickname}</Text>
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
