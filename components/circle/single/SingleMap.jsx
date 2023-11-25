import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { useRef } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const ZOOM_THRESHOLD = 10;

//singlemap을 따로 export 할 시에 에러발생...함수 다시 생각해봐야할듯
export const SingleMap = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  // 지도확대 동작 감지함수 새로
  const zoomInRegion = newRegion => {
    const zoomLevel = calculateZoomLevel(newRegion);
    //지도가 확대되면 개별 확대 화면으로 넘어감
    if (zoomLevel > ZOOM_THRESHOLD) {
      // zoomInFunction();
      // return () => navigation.navigate('ZoomInMap');
      return navigation.navigate('ZoomInMap');
    }
  };

  const calculateZoomLevel = region => {
    //위도와 경도 delta로 줌레벨 계산
    const latDelta = region.latitudeDelta;
    const lonDelta = region.longitudeDelta;
    return Math.log2(360 / (latDelta + lonDelta)) - 1;
  };

  const handleError = error => {
    console.log('Map error:', error);
  };
  return (
    <MapView
      ref={mapRef}
      style={styles.mapContainer}
      initialRegion={{
        latitude: 37.580112,
        longitude: 126.977166,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      provider={PROVIDER_GOOGLE}
      onError={handleError}
      onRegionChange={zoomInRegion}>
      <Marker
        coordinate={{
          latitude: 37.580112,
          longitude: 126.977166,
        }}
      />
    </MapView>
  );
};
