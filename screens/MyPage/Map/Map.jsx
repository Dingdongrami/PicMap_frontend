import { StyleSheet, Text, View } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { styles } from './styles';
import { useRef } from 'react';


export const Map = () => {
  const mapRef = useRef(null);
  const goToMonument = (monument) => {
    mapRef.current.animateToRegion(monument, 3*250);
  };
  const INIT = {
    latitude: 37.580112,
    longitude: 126.977166,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const examples = [
    {
      // ex1: {
      //   latitude: 37.00,
      //   longitude: 126.90,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      //   source: require('../../../assets/example/ex1.png')
      // },
      id: 1,
      coordinate: {
        latitude: 37.00,
        longitude: 126.90,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      source: require('../../../assets/example/ex1.png')
    },
    {
      // ex2: {
        // latitude: 32,
        // longitude: 126.66,
        // latitudeDelta: 0.01,
        // longitudeDelta: 0.01,
      //   source: require('../../../assets/example/ex2.png')
      // }
      id:1,
      coordinate: {
        latitude: 32,
        longitude: 126.66,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,        
      },
      source: require('../../../assets/example/ex2.png')
    },
    {
      // ex3: {
        // latitude: 31.12,
        // longitude: 126.977166,
        // latitudeDelta: 0.01,
        // longitudeDelta: 0.01,
      //   source: require('../../../assets/example/ex3.png')
      // },
      id: 3,
      coordinate: {
        latitude: 31.12,
        longitude: 126.977166,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      source: require('../../../assets/example/ex3.png') 
    },
    {
      // ex4: {
      //   latitude: 41.812246,
      //   longitude: 2.087440,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      //   source: require('../../../assets/example/ex4.png')
      // },
      id: 4,
      coordinate: {
        latitude: 41.812246,
        longitude: 2.087440,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,        
      },
      source:  require('../../../assets/example/ex4.png')
    },
    {
      // ex5: {
        // latitude: 41.813073,
        // longitude: 2.097226,
        // latitudeDelta: 0.01,
        // longitudeDelta: 0.01,
      //   source: require('../../../assets/example/ex5.png')
      // }
      id: 5,
      coordinate: {
        latitude: 41.813073,
        longitude: 2.097226,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      source: require('../../../assets/example/ex5.png')
    }
  ];
  return (
    <MapView
      style={styles.map}
      initialRegion={INIT}
      // initialRegion={examples.default}
      provider={PROVIDER_GOOGLE}>
      {/* <Marker
        coordinate={{
          latitude: 37.580112,
          longitude: 126.977166,
        }}
        pinColor="#2D63E2"
        title="하이"
        description="테스트"
      /> */}
      {examples.map((item, index) => (
        <Marker key={index} coordinate={item} imageSource={item.source} />
      ))}
    </MapView>
  );
};
