import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
import { Image } from 'expo-image';

export const PhotoCom = () => {
  const route = useRoute();
  const photoId = route.params.photoId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['onePhoto', photoId],
    queryFn: () => fetchOnePhoto(photoId),
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={comStyles.imageContainer}>
        <Image source={s3BaseUrl + data?.filePath} style={comStyles.image} />
      </View>
      <PhotoComments />
    </View>
  );
};
