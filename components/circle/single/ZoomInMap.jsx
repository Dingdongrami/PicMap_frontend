import { Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "./styles";

export const ZoomInMap = () => {
  return(
    <MapView
      style={styles.map}
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
        pinColor="#2D63E2"
        title="하이"
        description="테스트"
      />
    </MapView>
  )
}