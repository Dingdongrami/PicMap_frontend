import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';

const MyProfile = ({ onPress }) => {
  const [user, setUser] = useRecoilState(userState);
  return (
    <View style={styles.profileContainer}>
      {user.profileImage ? (
        <Image source={user.profileImage} style={styles.image} resizeMode="contain" />
      ) : (
        <View style={styles.noImageWrapper}>
          <Image source={user?.profileImage} style={styles.noImage} />
        </View>
      )}
      <View style={styles.rightWrapper}>
        <View style={styles.iconTextWrapper}>
          <Image source={require('../../assets/icons/private.png')} style={styles.privateImage} />
          <Text style={styles.usernameText}>{user.username}</Text>
        </View>
        <Text style={styles.onelineText}>{user.introduction}</Text>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.pinkButton} onPress={onPress}>
            <Image source={require('../../assets/icons/editBtn.png')} style={styles.editImage} />
            <Text style={styles.buttonText}>프로필 편집</Text>
          </Pressable>
          <Pressable style={styles.pinkButton}>
            <Image source={require('../../assets/icons/friendsBtn.png')} style={styles.friendsImage} />
            <Text style={styles.buttonText}>친구 목록</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;
