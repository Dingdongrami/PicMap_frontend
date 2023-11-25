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
  const examples = [
    {
      default: {
        latitude: 41.809745,
        longitude: 2.097774,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    },
    {
      ex1: {
        latitude: 41.811501,
        longitude: 2.098318,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        source: require('../../../assets/example/ex1.png')
      },
    },
    {
      ex2: {
        latitude: 41.811991,
        longitude: 2.098610,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        source: require('../../../assets/example/ex2.png')

      }
    },
    {
      ex3: {
        latitude: 41.812629,
        longitude: 2.094989,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        source: require('../../../assets/example/ex3.png')
      },
    },
    {
      ex4: {
        latitude: 41.812246,
        longitude: 2.087440,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        source: require('../../../assets/example/ex4.png')
      },
    },
    {
      ex5: {
        latitude: 41.813073,
        longitude: 2.097226,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        source: require('../../../assets/example/ex5.png')
      }
    }
  ];
  return (
    <MapView
      style={styles.map}
      // initialRegion={{
      //   latitude: 37.580112,
      //   longitude: 126.977166,
      //   latitudeDelta: 0.01,
      //   longitudeDelta: 0.01,
      // }}
      initialRegion={examples.default}
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
        <Marker coordinate={item} imageSource={item.source} />
      ))}
    </MapView>
  );
};
