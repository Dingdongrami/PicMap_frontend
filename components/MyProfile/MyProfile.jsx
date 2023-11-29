import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';

const MyProfile = ({ onPressEditProfile, onPressFriendsList }) => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <View style={styles.profileContainer}>
      {user.profileImage ? (
        <Image source={user.profile} style={styles.image} contentFit="cover" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.noImage} />
        </View>
      )}
      <View style={styles.rightWrapper}>
        <View style={styles.iconTextWrapper}>
          <Image source={require('../../assets/icons/private.png')} style={styles.privateImage} />
          <Text style={styles.usernameText}>{user.username}</Text>
        </View>
        <Text style={styles.onelineText}>{user.introduction}</Text>
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
