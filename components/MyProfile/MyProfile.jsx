import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from './styles';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/userApi';
import { s3BaseUrl } from '../../constants/config';

const MyProfile = ({ onPressEditProfile, onPressFriendsList }) => {
  const setUser = useSetRecoilState(userState);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['user', 17],
    queryFn: () => fetchUser(17),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (!isLoading) {
    setUser(data);
  }

  return (
    <View style={styles.profileContainer}>
      {data?.profileImage ? (
        <Image source={s3BaseUrl + data?.profileImage} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.noImage} />
        </View>
      )}
      <View style={styles.rightWrapper}>
        <View style={styles.iconTextWrapper}>
          <Image source={require('../../assets/icons/private.png')} style={styles.privateImage} />
          <Text style={styles.usernameText}>{data?.nickname}</Text>
        </View>
        <Text style={styles.onelineText}>{data?.introduce}</Text>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.pinkButton} onPress={onPressEditProfile}>
            <Image source={require('../../assets/icons/edit_btn.png')} style={styles.editImage} />
            <Text style={styles.buttonText}>프로필 편집</Text>
          </Pressable>
          <Pressable style={styles.pinkButton} onPress={onPressFriendsList}>
            <Image source={require('../../assets/icons/friends_btn.png')} style={styles.friendsImage} />
            <Text style={styles.buttonText}>친구 목록</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;
