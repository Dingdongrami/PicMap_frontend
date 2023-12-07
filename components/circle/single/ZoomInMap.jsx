import { Marker } from 'react-native-maps';
import { styles } from './styles';
import { View } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Image } from 'expo-image';
import { INIT } from './examples';
import { s3BaseUrl } from '../../../constants/config';

import ClusteredMapView from '../../MapMarker/ClusteredMapView';
import { useQueryClient } from '@tanstack/react-query';
import { Pressable } from 'react-native';
import { fetchOnePhoto } from '../../../api/photoApi';

export const ZoomInMap = ({ route, navigation }) => {
  const clustered = route.params.locs.current; // 클릭된 클러스터링
  const photos = route.params.album; // 써클 속 사진들
  // console.log(clustered[0].geometry.coordinates[1]);
  const map = useRef(null);
  const queryClient = useQueryClient();
  const [markers, setMarkers] = useState([{ id: 0, latitude: INIT.latitude, longitude: INIT.longitude, image: '' }]);
  const [region, setRegion] = useState({
    latitude: clustered[0].geometry.coordinates[1],
    longitude: clustered[0].geometry.coordinates[0],
    latitudeDelta: 3,
    longitudeDelta: 3,
  });

  const generateMarkers = () => {
    const markersArray = [];
    for (let i = 0; i < photos.length; i++) {
      if (photos[i].latitude && photos[i].longitude) {
        markersArray.push({
          id: i,
          latitude: photos[i]?.latitude,
          longitude: photos[i]?.longitude,
          thumbnail: s3BaseUrl + photos[i]?.filePath,
          photoId: photos[i]?.id,
        });
      }
    }
    setMarkers(markersArray);
  };

  const onRegionChangeComplete = newRegion => {
    setZoom(getZoomFromRegion(newRegion));
    setRegion(newRegion);
  };

  const navigateToPhotoCom = async item => {
    const photo = await queryClient.fetchQuery({
      queryKey: ['onePhoto', item.photoId],
      queryFn: () => fetchOnePhoto(item.photoId),
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    });

    navigation.navigate('PhotoCom', {
      photo: photo,
    });
  };

  useEffect(() => {
    photos && generateMarkers();
  }, [photos]);

  if (photos) {
    return (
      <View style={{ flex: 1 }}>
        {photos && (
          <ClusteredMapView
            clusterColor="#00B386"
            ref={map}
            mapType="standard"
            style={styles.mapContainer}
            initialRegion={region}
            onRegionChangeComplete={onRegionChangeComplete}>
            {markers.map(item => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                imageUri={item.thumbnail}
                photoId={item.photoId}
                tracksViewChanges={false}>
                <Pressable onPress={() => navigateToPhotoCom(item)}>
                  <Image
                    source={item.thumbnail}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 10,
                    }}
                  />
                </Pressable>
              </Marker>
            ))}
          </ClusteredMapView>
        )}
      </View>
    );
  }
};
