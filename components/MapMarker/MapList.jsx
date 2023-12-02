import { useCallback, useEffect } from 'react';
import { View, FlatList, Pressable, Image } from 'react-native';
import { useState } from 'react';
import { photoStyles } from './styles';

export const MapList = ({route}) => {
  const { locs } = route.params; //JSON 형식으로 받아와짐
  const locsArray = locs.current; //배열 형식
  const [items, setItems] = useState([
    { index: 0, coordinates: [], imageUri: ""}
  ]);
  // locsArray에서 순회하면서 [{},{}] 이런 형식으로 만드는 것
  const childrenItems = useCallback(() => {
    const childArray = [];
    for(let i=0; i<locsArray.length; i++){
      childArray.push({
        coordinates: locsArray[i].geometry.coordinates,
        imageUri: locsArray[i].properties.imageUri,
        index: locsArray[i].properties.index
      });
    }
    console.log(childArray);
    setItems(childArray);
  });

  useEffect(() => {
    childrenItems();
  }, []);

  const renderItem = ({item, index}) => (
    <View style={photoStyles.albumContainer}>
      <View style={photoStyles.imageContainer}>
        <Pressable>
          <Image source={item.imageUri} style={photoStyles.imageIcon}/>
        </Pressable>
      </View>
    </View>
  );

  return(
    <View style={{backgroundColor: 'white', flex: 1, paddingTop: 20}}>
      <FlatList 
      numColumns={2}
      data={items}
      renderItem={renderItem}
      />
    </View>
  );
};