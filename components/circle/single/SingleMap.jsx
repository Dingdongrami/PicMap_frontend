import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { styles } from "../styles";

//singlemap을 따로 export 할 시에 에러발생...함수 다시 생각해봐야할듯
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