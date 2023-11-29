import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { INIT, locs } from './examples';
import { styles } from './styles';

import ClusteredMapView from '../../../components/MapMarker/ClusteredMapView';

// const getRandomLatitude = (min = 48, max = 56) => {
//   return Math.random() * (max - min) + min
// }

// const getRandomLongitude = (min = 14, max = 24) => {
//   return Math.random() * (max - min) + min
// }

const getZoomFromRegion = (region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
}

export const Map = () => {
  const map = useRef(null)

  const [zoom, setZoom] = useState(18);
  const [markers, setMarkers] = useState([
    { id: 0, latitude: INIT.latitude, longitude: INIT.longitude },
  ])
  const [region, setRegion] = useState({
    latitude: INIT.latitude,
    longitude: INIT.longitude,
    latitudeDelta: INIT.latitudeDelta,
    longitudeDelta: INIT.longitudeDelta
  });

  const generateMarkers = useCallback(() => {
    const markersArray = [];

    for (let i = 0; i < locs.length; i++) {
      markersArray.push({
        id: i,
        latitude: locs[i].coordinate.latitude,
        longitude: locs[i].coordinate.longitude,
        thumbnail: locs[i].thumbnail,
        count: locs[i].count
        // latitude: getRandomLatitude(lat - 0.3, lat + 0.3),
        // longitude: getRandomLongitude(long - 0.3, long + 0.3),
      });
    }

    setMarkers(markersArray);
  }, [])

  const onRegionChangeComplete = (newRegion) => {
    setZoom(getZoomFromRegion(newRegion))
    setRegion(newRegion)
  }

  useEffect(() => {
    generateMarkers();
  }, [])

  return (
    <View style={styles.container}>
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
          tracksViewChanges={false}>
            <Image 
            source={item.thumbnail}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10
            }}
            resizeMode='cover'/>
          </Marker> 
        ))}
      </ClusteredMapView>
    </View>
  )
}

