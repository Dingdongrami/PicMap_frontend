import { View, ActivityIndicator, Dimensions, useWindowDimensions, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles, PhotoComments } from '../../../components/circle';
import { s3BaseUrl } from '../../../constants/config';
import { useQuery } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../../api/photoApi';
// import { Image } from 'expo-image';
import { Zoom, createZoomListComponent } from 'react-native-reanimated-zoom';
import Animated from 'react-native-reanimated';
import { GestureHandlerGestureEvent, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { FlatList, Image } from 'react-native';
// import { Image } from 'expo-image';
import { useCallback, useState } from 'react';

// const SCREEN_WIDTH = Dimensions.get("screen").width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ZoomFlatList = createZoomListComponent(AnimatedFlatList);

export const CirclePhotoCom = () => {
  const route = useRoute();
  const photo = route.params.photo;
  const album = route.params.album;
  // console.log(photo);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['onePhoto', photo.id],
    queryFn: () => fetchOnePhoto(photo.id),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <View style={comStyles.imageContainer}> */}
      <View style={{ flex: 1 }}>
        {/* <View style={{flex:2}}> */}
        <ListExample album={album} photo={photo} />
        {/* </View> */}
      </View>
      {/* </View> */}
      {/* <PhotoComments photo={data} /> */}
    </GestureHandlerRootView>
  );
};

const ListExample = ({ album, photo }) => {
  const dimension = useWindowDimensions();
  const itemPadding = 0;
  const itemWidth = dimension.width - itemPadding * 2; // 각 항목의 너비

  // 현재 선택된 사진의 인덱스 찾기
  const selectedIndex = album.findIndex(item => item.id === photo.id);

  const getItemLayout = (data, index) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Zoom>
            <Image
              source={{
                uri: s3BaseUrl + item?.filePath,
              }}
              style={{
                width: dimension.width - itemPadding * 2,
                height: dimension.height - itemPadding * 2,
              }}
              contentFit="contain"
            />
          </Zoom>
        </View>
        <PhotoComments photo={item} />
      </View>
    );
  };

  return (
    <ZoomFlatList
      data={album}
      initialScrollIndex={selectedIndex}
      getItemLayout={getItemLayout}
      pagingEnabled
      horizontal
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      // ListFooterComponent={(item)=><PhotoComments photo={item}/>}
    />
  );
};
