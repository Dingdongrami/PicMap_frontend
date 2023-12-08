import { View, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

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
        <ImageZoom
          style={comStyles.image}
          uri={s3BaseUrl + data?.filePath}
          resizeMode="contain"
          minScale={1}
          maxScale={2.5}
          renderLoader={() => <ActivityIndicator color="black" size="large" />}
        />
      </View>
      <PhotoComments photo={data} />
    </View>
  );
};
