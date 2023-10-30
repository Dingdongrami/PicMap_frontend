import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { styles } from './styles';

const MyProfile = ({ onPress }) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileImage}></View>
      <View style={styles.rightWrapper}>
        <View style={styles.iconTextWrapper}>
          <Image source={require('../../assets/icons/private.png')} style={styles.privateImage} />
          <Text style={styles.usernameText}>username</Text>
        </View>
        <Text style={styles.onelineText}>한줄 소개</Text>
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
