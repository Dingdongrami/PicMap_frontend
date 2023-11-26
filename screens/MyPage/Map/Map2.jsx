import { View, Text, Dimensions, Pressable } from 'react-native';
import MapView from 'react-native-maps';
import { ClusterMarker } from '../../../components/MapMarker/ClusterMarker';
import { getRegion, getCluster } from '../../../components/MapMarker/MapUtil';
import React, { useState, useEffect } from 'react';
import { styles } from './exstyles';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE2 = -122.4334;

const markers = [
    {
        latitude: LATITUDE,
        longitude: LONGITUDE
    }, {
        latitude: LATITUDE,
        longitude: LONGITUDE2
    }
];

export const Map2 = () => {

  const NullRegion = getRegion(LATITUDE, LONGITUDE, LATITUDE_DELTA);
  const [region, setRegion] = useState(NullRegion);

  const increment = () => {
    const updatedRegion = getRegion(
      region.latitude,
      region.longitude,
      region.latitudeDelta * 0.5
    );
    setRegion(updatedRegion);
  };

  const decrement = () => {
    const updatedRegion = getRegion(
      region.latitude,
      region.longitude,
      region.latitudeDelta / 0.5
    );
    setRegion(updatedRegion);
  };

  const MarkerPress = (marker) => {
    const updatedRegion = getRegion(
      marker.geometry.coordinates[1],
      marker.geometry.coordinates[0],
      region.latitudeDelta * 0.5,
    );
    setRegion(updatedRegion);
  };

  // const renderMarker = (marker, _index) => {
  //   const key = _index + marker.geometry.coordinates[0];

  //   if(marker.properties) {
  //     return(
  //       <MapView.Marker
  //       key={`${key}${marker.properties.cluster_id}`}
  //       coordinate={{latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0]}}
  //       onPress={() => MarkerPress(marker)}
  //       >
  //         <ClusterMarker count={marker.properties.point_count} />
  //       </MapView.Marker>
  //     )
  //   }else{
  //     return(
  //       <MapView.Marker
  //       key={key}
  //       coordinate={{latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0]}}
  //       />
  //     )
  //   }
  // }

  const places = markers.map((place) => {
    return {
      geometry: {
        coordinates: [
          place.longitude,
          place.latitude,
        ]
      }
    };
  });
  // const { marker, cluster} = getCluster(places, region);
    // const cluster = getCluster(places, region);

  // useEffect(() => {
  //   increment();
  //   decrement();
  //   // MarkerPress();
  //   renderMarker();
  // }, []);

  return(
    <View style={styles.container}>
      {/* <MapView style={styles.map}>
        { marker.map(renderMarker(item)) }
      </MapView> */}

      <View style={styles.buttonContainer}>
        <Pressable
        onPress={() => decrement()}
        style={[styles.bubble, styles.button]}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
        </Pressable>
        <Pressable
        onPress={() => increment()}
        style={[styles.bubble, styles.button]}
        >
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};