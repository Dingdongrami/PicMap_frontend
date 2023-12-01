import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';
import { getPhotoBorderStyle } from '../../utils/getPhotoBorderStyles';
import { Image } from 'expo-image';
import { s3BaseUrl } from '../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../../api/photoApi';
import { useNavigation } from 'expo-router';

const CirclePost = ({ circle }) => {
  const circleId = circle.id;
  const navigation = useNavigation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['circlePost', circleId],
    queryFn: () => fetchPhotos(circleId),
  });

  //각 써클로 접속하는 함수
  const enterCircle = () => {
    return navigation.navigate('SplashUI', { circleId: circle.id });
  };

  return (
    data?.length > 3 && (
      <>
        <Pressable style={styles.circle} onPress={enterCircle}>
          {data.slice(0, 4).map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image
                style={[styles.photo, getPhotoBorderStyle(index)]}
                source={s3BaseUrl + photo.filePath}
                contentFit="cover"
              />
            </View>
          ))}
        </Pressable>
        <Text style={styles.circleNameText}>{circle.name}</Text>
      </>
    )
  );
};

export default CirclePost;
