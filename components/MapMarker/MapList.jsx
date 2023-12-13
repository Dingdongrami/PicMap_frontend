import { useCallback, useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { photoStyles } from './styles';
import { useQueryClient } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../api/photoApi';

export const MapList = ({ route, navigation }) => {
  const queryClient = useQueryClient();
  const { locs } = route.params; //JSON 형식으로 받아와짐
  const locsArray = locs.current; //배열 형식
  const [items, setItems] = useState([{ index: 0, coordinates: [], imageUri: '' }]);
  // console.log(locsArray);
  // locsArray에서 순회하면서 [{},{}] 이런 형식으로 만드는 것
  const childrenItems = useCallback(() => {
    const childArray = [];
    for (let i = 0; i < locsArray.length; i++) {
      childArray.push({
        coordinates: locsArray[i].geometry.coordinates,
        imageUri: locsArray[i].properties.imageUri,
        index: locsArray[i].properties.index,
        photoId: locsArray[i].properties.photoId,
      });
    }
    // console.log(JSON.stringify(childArray));
    setItems(childArray);
  }, []);

  const onPressPhotoCom = async item => {
    // navigation.navigate('PhotoCom', {
    //   photoId: item.photoId,
    // }),
    // console.log(item.photoId);
    const photo = await queryClient.fetchQuery({
      queryKey: ['onePhoto', item.photoId],
      queryFn: () => fetchOnePhoto(item.photoId),
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    });

    navigation.navigate('MapPhotoCom', {
      photo: photo,
    });
  };

  useEffect(() => {
    childrenItems();
  }, []);

  const renderItem = ({ item, index }) => (
    <Pressable style={photoStyles.albumContainer} onPress={() => onPressPhotoCom(item)}>
      <View style={photoStyles.imageContainer}>
        <Image source={item.imageUri} style={photoStyles.imageIcon} />
      </View>
    </Pressable>
  );

  return (
    <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 20 }}>
      <FlatList numColumns={2} data={items} renderItem={renderItem} />
    </View>
  );
};
