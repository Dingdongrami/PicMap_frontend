import { View, Text } from 'react-native';
import { styles } from './styles';
import { getPhotoBorderStyle } from '../../utils/getPhotoBorderStyles';
import { Image } from 'expo-image';
import { s3BaseUrl } from '../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../../api/circleApi';

const CirclePost = ({ item }) => {
  const circleId = item.id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['circlePost', circleId],
    queryFn: () => fetchPhotos(circleId),
  });

  if (isLoading) {
    return <Text>Loading...</Text>; // Or any other loading indicator
  }

  if (isError) {
    return <Text>Error fetching data</Text>; // Or any error indicator
  }

  return (
    data?.length > 3 && (
      <>
        <View style={styles.circle}>
          {data.slice(0, 4).map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image
                style={[styles.photo, getPhotoBorderStyle(index)]}
                source={{ uri: s3BaseUrl + photo.filePath }}
                resizeMode="cover"
              />
            </View>
          ))}
        </View>
        <Text style={styles.circleNameText}>{item.name}</Text>
      </>
    )
  );
};

export default CirclePost;
