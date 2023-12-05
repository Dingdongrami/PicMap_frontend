import { View, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
// import { Image } from 'expo-image';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';

export const PhotoCom = () => {
  const route = useRoute();
  const photo = route.params.photo;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['onePhoto', photo.id],
    queryFn: () => fetchOnePhoto(photo.id),
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={comStyles.imageContainer}>
        {/* <ScrollView
          maximumZoomScale={3} // 최대 3배까지 확대 가능
          minimumZoomScale={1} // 최소 1배 (기본 크기)
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}> */}
        {/* <Image source={{ uri: s3BaseUrl + data?.filePath }} style={comStyles.image} resizeMode="contain" /> */}
        {/* </ScrollView> */}
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
