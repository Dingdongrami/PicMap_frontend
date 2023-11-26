import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { examples } from './examples';
import { INIT } from './examples';
import { styles } from './styles';

import ClusteredMapView from '../../../components/MapMarker/ClusteredMapView';

const getZoomFromRegion = (region) => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
}

export const Map = () => {
  const map = useRef(null)

  const [zoom, setZoom] = useState(18);
  const [markers, setMarkers] = useState([
    { id: 0, latitude: 53.91326738786109, longitude: 27.523712915343737 },
  ])
  const [region, setRegion] = useState(INIT);

  const generateMarkers = useCallback((lat, long) => {
    const markersArray = [];

    for (let i = 0; i < examples.length; i++) {
      markersArray.push({
        id: i,
        latitude: examples[i].coordinate.latitude,
        longitude: examples[i].coordinate.longitude
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

  return (
    <View style={styles.container}>
      <ClusteredMapView
        clusterColor="red"
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
          />
        ))}
      </ClusteredMapView>
    </View>
  )
}