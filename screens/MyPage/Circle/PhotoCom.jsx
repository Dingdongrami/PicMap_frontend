import { Text, View, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
import { useEffect, useState } from 'react';
import { photoInstance } from '../../../api/instance';
import { Image } from 'expo-image';

// const windowHeight = window.
//API연결할지, 사진을 가져올지,,
export const PhotoCom = () => {
  const route = useRoute();
  const photoId = route.params.photoId;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['onePhoto', photoId],
    queryFn: () => fetchOnePhoto(photoId),
  });

  return (
    <View style={{ flex: 1 }}>
      {/* <Text>{index}에 해당하는 룸입니다</Text> */}
      <View style={comStyles.imageContainer}>
        <Image source={s3BaseUrl + data?.filePath} style={comStyles.image} />
      </View>
      <PhotoComments />
    </View>
  );
};
