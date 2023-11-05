import { View, Text, Pressable, FlatList, ScrollView  } from 'react-native';
import { useState } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { SingleMap } from '../../../components/circle/single/SingleMap';
import { SinglePhotoIcon } from '../../../components/circle/album/SinglePhotoIcon';
import { OthersProfile } from '../../../components/MyProfile/OthersProfile';

export const SingleCircle = ({ route }) => {
  const [ isReady, setIsReady ] = useState(splashState);
  const [ isMap, setIsMap ] = useState(true);
  //써클의 id값 찾아내기
  const { itemId } = route.params;
  const album = Array(90).fill();
  const itemsPerRow = 3;
  const groupedData = [];
  for(let i=0; i<album.length; i+=itemsPerRow) {
    groupedData.push(album.slice(i, i+itemsPerRow));
  }

  const handleScroll = (e) => {
    //스크롤 위치를 확인
    const yOffset = e.nativeEvent.contentOffset.y;
    if(yOffset > 110){
      setIsMap(false);
    }else if(yOffset <=0){
      setIsMap(true);
    }
  };

  if(!isReady) {
    return <SplashUI />
  } 
  else{
    return(
      <View style={{flex:1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          <View style={styles.personBox}> 
            <OthersProfile />
          </View>
          {/* <SingleMap /> */}
          {isMap && (
            <MapView
              style={styles.mapContainer}
              initialRegion={{
                latitude: 37.580112,
                longitude: 126.977166,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              provider={PROVIDER_GOOGLE}>
              <Marker
                coordinate={{
                  latitude: 37.580112,
                  longitude: 126.977166,
                }}
              />
            </MapView>
          )}
          <View style={styles.wrapper} >
            <Text style={styles.imageText}>사진</Text>
            <Pressable style={styles.optionButton}>
              <Text style={styles.optionText}>선택</Text>
            </Pressable>
          </View>
          <View style={styles.albumContainer}>
            {groupedData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.photoRow}>
                {row.map((item, index) => (
                  <SinglePhotoIcon key={index} />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
};


