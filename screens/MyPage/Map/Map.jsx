import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { examples } from './examples';
import { INIT } from './examples';
import { styles } from './styles';

import ClusteredMapView from '../../../components/MapMarker/ClusteredMapView';

const getRandomLatitude = (min = 48, max = 56) => {
  return Math.random() * (max - min) + min
}

const getRandomLongitude = (min = 14, max = 24) => {
  return Math.random() * (max - min) + min
}

const getZoomFromRegion = (region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
}

export const Map = () => {
  const map = useRef(null)

  const [zoom, setZoom] = useState(18);
  const [markers, setMarkers] = useState([
    { id: 0, latitude: INIT.latitude, longitude: INIT.longitude },
  ])
  const [region, setRegion] = useState(INIT);

  const generateMarkers = useCallback((lat, long) => {
    const markersArray = [];

    for (let i = 0; i < 30; i++) {
      markersArray.push({
        id: i,
        // latitude: examples[i].coordinate.latitude,
        // longitude: examples[i].coordinate.longitude
        latitude: getRandomLatitude(lat - 0.3, lat + 0.3),
        longitude: getRandomLongitude(long - 0.3, long + 0.3),
      });
    }

    setMarkers(markersArray)
  }, [])

  const onRegionChangeComplete = (newRegion) => {
    setZoom(getZoomFromRegion(newRegion))
    setRegion(newRegion)
  }

  useEffect(() => {
    generateMarkers(region.latitude, region.longitude)
  }, [])

  const markerIcon = (
    <View style={{ backgroundColor: '#00B386', borderRadius: 50, padding: 5 }}>
      {/* 원하는 아이콘 혹은 이미지 */}
      <Image 
        source={require('../../../assets/example/ex2.png')}
        style={{width: 25, height: 25}}
      />
    </View>
  );

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
            // style={{backgroundColor: '#00B386'}}
            image={()=>markerIcon}
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          />
        ))}
      </ClusteredMapView>
    </View>
  )
}
