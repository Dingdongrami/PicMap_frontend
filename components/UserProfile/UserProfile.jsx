import { View, Text, StyleSheet, Pressable } from 'react-native';
import { styles } from '../MyProfile/styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { Image } from 'expo-image';

const UserProfile = ({ user, onPressFriendRequest }) => {
  return (
    <View style={styles.profileContainer}>
      {user.profileImage ? (
        <Image source={user?.profileImage} style={styles.image} contentFit="cover" />
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
          <Pressable style={styles.pinkButton} onPress={onPressFriendRequest}>
            <Image source={require('../../assets/icons/person_add.png')} style={styles.friendsImage} />
            <Text style={styles.buttonText}>친구요청</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
