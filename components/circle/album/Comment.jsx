import { Text, View, Pressable } from 'react-native';
import { styles } from '../../PersonRow/styles';
import { comStyles } from './styles';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchUser } from '../../../api/userApi';
import { useQuery } from '@tanstack/react-query';
import { s3BaseUrl } from '../../../constants/config';

const Comment = ({ comment, isFullScrolled = false, onPressDelete }) => {
  const navigation = useNavigation();
  const { data: user } = useQuery({
    queryKey: ['user', comment?.userId],
    queryFn: () => fetchUser(comment?.userId),
    enabled: !!comment?.userId,
  });

  // 댓글 내용을 단어별로 나누고, @로 시작하는 단어를 식별
  const commentContent = comment?.comment?.split(' ').map((part, index) => {
    if (part.startsWith('@')) {
      return (
        <Text key={index} style={comStyles.usernameContent}>
          {part}
        </Text>
      );
    } else {
      return <Text key={index}>{part}</Text>;
    }
  });

  const onPressUser = () => {
    // console.log(navigation.getState());
    navigation.navigate('UserPage', { user: user });
  };

  return (
    <View style={[styles.personRow, !isFullScrolled && { borderBottomWidth: 0 }]}>
      {user?.profileImage ? (
        <Image source={s3BaseUrl + user.profileImage} style={styles.profileImage} contentFit="cover" />
      ) : (
        <View style={styles.personWrapper}>
          <Image source={require('../../../assets/icons/user.png')} style={styles.defaultImage} contentFit="contain" />
        </View>
      )}
      <Pressable onPress={onPressUser} style={comStyles.commentWrapper}>
        <Text style={comStyles.username}>{user?.nickname}</Text>
        <View style={comStyles.contentWrapper}>
          <Text style={comStyles.content}>{commentContent?.reduce((prev, curr) => [prev, ' ', curr])}</Text>
        </View>
      </Pressable>
      <Pressable style={styles.buttonWrapper} onPress={onPressDelete}>
        <Image
          source={require('../../../assets/icons/remove_brown.png')}
          style={comStyles.button}
          contentFit="contain"
        />
      </Pressable>
    </View>
  );
};

export default Comment;
