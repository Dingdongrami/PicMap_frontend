import { View, Image, ActivityIndicator, Dimensions, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
// import { Image } from 'expo-image';
import { Zoom, createZoomListComponent } from 'react-native-reanimated-zoom';
import Animated from 'react-native-reanimated';
import { GestureHandlerGestureEvent, GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';

// const SCREEN_WIDTH = Dimensions.get("screen").width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ZoomFlatList = createZoomListComponent(AnimatedFlatList);

export const CirclePhotoCom = () => {
  const route = useRoute();
  const photo = route.params.photo;
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['onePhoto', photo.id],
  //   queryFn: () => fetchOnePhoto(photo.id),
  //   staleTime: 1000 * 60 * 60 * 24,
  //   cacheTime: 1000 * 60 * 60 * 24,
  // });
  const [example, setExample] = useState('simple');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={comStyles.imageContainer}>
        <View style={{flex:1, paddingTop: 60}}>
          {example === 'simple' ? (
            <SimpleExample key="1" album={data} />
          ) : (
            <ListExample key="2" />
          )}
        </View>

      </View>
      <PhotoComments photo={data} />
    </GestureHandlerRootView>
  );
};

const SimpleExample = () => {
  const dimension = useWindowDimensions();

  return(
    <Zoom>
      <Image 

      />
    </Zoom>
  );
};

const ListExample = () => {
  return(
    <Zoom>

    </Zoom>
  );
};