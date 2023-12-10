import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Marker } from 'react-native-maps';
import { INIT } from '../MyPage/Map/examples';
import { styles } from '../MyPage/Map/styles';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPhotos } from '../../api/mapphotoApi';
import { s3BaseUrl } from '../../constants/config';
import ClusteredMapView from '../../components/MapMarker/ClusteredMapView';
import { ActivityIndicator } from 'react-native';
import { Pressable } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { fetchOnePhoto } from '../../api/photoApi';
import { tabState } from '../../stores/tab-store';
import { useRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';
import { allPublicPhotos } from '../../api/mapphotoApi';

const getZoomFromRegion = region => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};

const MapSearch = ({ navigation, route, filtered,}) => {
  const [routeName, setRouteName] = useRecoilState(tabState);
  const map = useRef(null);
  const queryClient = useQueryClient();
  const isFocused = useIsFocused();

  const [markers, setMarkers] = useState([{ id: 0, latitude: INIT.latitude, longitude: INIT.longitude, image: '' }]);
  const [region, setRegion] = useState({
    latitude: INIT.latitude,
    longitude: INIT.longitude,
    latitudeDelta: INIT.latitudeDelta,
    longitudeDelta: INIT.longitudeDelta,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allPhotos', 'public'],
    queryFn: () => allPublicPhotos(),
    refetchWindowFocus: true,
    staleTime: 1000 * 60 
  });

  useEffect(()=>{
    if(isFocused){
      setRouteName(route.name);
    }
  },[isFocused]);

  const generateMarkers = () => {
    const markersArray = [];
    if(filtered != 0) {
      for (let i = 0; i < filtered?.length; i++) {
        if (filtered[i].photo.latitude && filtered[i].photo.longitude) {
          markersArray.push({
            id: i,
            latitude: filtered[i]?.photo.latitude,
            longitude: filtered[i]?.photo.longitude,
            thumbnail: s3BaseUrl + filtered[i]?.photo.filePath,
            photoId: filtered[i]?.photo.id,
            circleName: filtered[i]?.circleName
          });
        }
      }
    }else{
      for (let i = 0; i < data?.length; i++) {
        if (data[i].latitude && data[i].longitude) {
          markersArray.push({
            id: i,
            latitude: data[i]?.latitude,
            longitude: data[i]?.longitude,
            thumbnail: s3BaseUrl + data[i]?.filePath,
            photoId: data[i]?.id,
          });
        }
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

    navigation.navigate('MapPhotoCom', {
      photo: photo,
    });
  };

  useEffect(() => {
    generateMarkers();
  }, [data, filtered]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D0C8C8" />
      </View>
    );
  } else if (data) {
    return (
      <View style={styles.container}>
        {data && (
          <ClusteredMapView
            clusterColor="#00B386"
            ref={map}
            mapType="standard"
            style={styles.mapView}
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

export default MapSearch;