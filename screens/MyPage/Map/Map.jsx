import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import { Image } from 'expo-image';
import { Marker } from 'react-native-maps';
import { INIT, locs } from './examples';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPhotos } from '../../../api/mapphotoApi';
import { s3BaseUrl } from '../../../constants/config';
import ClusteredMapView from '../../../components/MapMarker/ClusteredMapView';
import { fetchCircle } from '../../../api/circleApi';


const getZoomFromRegion = (region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
}

const getRandomLatitude = (min = 48, max = 56) => {
  return Math.random() * (max - min) + min;
};

const getRandomLongitude = (min = 14, max = 24) => {
  return Math.random() * (max - min) + min;
};

export const Map = () => {
  const map = useRef(null);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['allPhotos'],
  //   queryFn: ()=>fetchAllPhotos(17),
  //   refetchWindowFocus: true,
  //   // refetchOnMount: true,
  // });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circle'],
    queryFn: () => fetchCircle(17),
    refetchOnWindowFocus: true,
  });


  const [zoom, setZoom] = useState(18);
  const [markers, setMarkers] = useState([
    { id: 0, latitude: INIT.latitude, longitude: INIT.longitude, image: undefined },
  ])
  const [region, setRegion] = useState({
    latitude: INIT.latitude,
    longitude: INIT.longitude,
    latitudeDelta: INIT.latitudeDelta,
    longitudeDelta: INIT.longitudeDelta
  });
  console.log(data);

  const allPhotoLength = data?.length;
  const generateMarkers = useCallback((lat, long) => {
    const markersArray = [];
    for (let i = 0; i < allPhotoLength; i++) {
      markersArray.push({
        id: i,
        // latitude: data[i].coordinates[0],
        // longitude: data[i].coordinates[1],
        latitude: getRandomLatitude(lat - 0.5, lat + 0.5),
        longitude: getRandomLongitude(long - 0.5, long + 0.5),
        thumbnail: s3BaseUrl + data[i].thumbnail,
      });
      // console.log(locs[i].imageUri);
    }
    setMarkers(markersArray);
  }, [])

  const onRegionChangeComplete = (newRegion) => {
    setZoom(getZoomFromRegion(newRegion))
    setRegion(newRegion)
  }

  useEffect(() => {
    data &&
      generateMarkers(region.latitude, region.longitude);
  }, [data]);

  return (
    <View style={styles.container}>
      { data &&
        <ClusteredMapView
        clusterColor="#00B386"
        ref={map}
        mapType="standard"
        style={styles.mapView}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}>
        {markers.map((item) => (
          <Marker
          key={item.id}
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          imageUri={item.thumbnail}
          tracksViewChanges={false}>
            <Image 
            source={item.thumbnail}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10
            }}/>
          </Marker> 
        ))}
      </ClusteredMapView>
      }
    </View>
  )
}

