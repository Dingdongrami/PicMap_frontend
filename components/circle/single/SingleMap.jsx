import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { styles } from "../styles";

export const SingleMap = () => {
  return(
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
  );
};