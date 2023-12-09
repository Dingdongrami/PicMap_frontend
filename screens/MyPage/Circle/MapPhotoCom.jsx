import { View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
import { Image } from 'expo-image';

export const MapPhotoCom = () => {
  const route = useRoute();
  const photo = route.params.photo;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['onePhoto', photo.id],
    queryFn: () => fetchOnePhoto(photo.id),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={comStyles.imageContainer}>
        <Image
          style={comStyles.image}
          source={s3BaseUrl + data?.filePath}
          contentFit="contain"
        />
      </View>
      <PhotoComments photo={data} />
    </View>
  );
};
