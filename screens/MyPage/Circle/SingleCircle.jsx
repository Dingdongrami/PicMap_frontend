import { View, Text, Pressable, FlatList, Button, Image, Animated, PanResponder  } from 'react-native';
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
  //써클의 id값 찾아내기
  const { itemId } = route.params;
  const album = Array(15).fill();

  if(!isReady) {
    return <SplashUI />
  } 
  else{
    return(
      <View style={{flex:1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <View style={styles.personBox}> 
          <OthersProfile />
        </View>
        {/* <SingleMap /> */}
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

        <View style={styles.wrapper} >
          <Text style={styles.imageText}>사진</Text>
          <Pressable style={styles.optionButton}>
            <Text style={styles.optionText}>선택</Text>
          </Pressable>
        </View>
        <View style={styles.albumContainer}>
          <FlatList 
            data={album}
            renderItem={({ item }) => <SinglePhotoIcon item={item} />}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
};


