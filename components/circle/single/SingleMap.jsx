import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import { useRef, useState, useCallback, useEffect } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Map } from '../../../screens/MyPage/Map/Map';
import ClusteredMapView from '../../MapMarker/ClusteredMapView';
import { INIT } from './examples';

const ZOOM_THRESHOLD = 10;
const getRandomLatitude = (min = 48, max = 56) => {
  return Math.random() * (max - min) + min
}

const getRandomLongitude = (min = 14, max = 24) => {
  return Math.random() * (max - min) + min
}


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
      return () => navigation.navigate('ZoomInMap');
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
        latitude: getRandomLatitude(lat - 0.5, lat + 0.5),
        longitude: getRandomLongitude(long - 0.5, long + 0.5),
      });
    }

    setMarkers(markersArray)
  }, [])
  
  useEffect(() => {
    generateMarkers(region.latitude, region.longitude)
  }, [])

  return (
    <ClusteredMapView
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
        {markers.map((item) => (
          <Marker
          key={item.id}
          coordinate={{
            latitude: 37.580112,
            longitude: 126.977166,
          }}
          />
        ))}

    </ClusteredMapView>
  );
};
