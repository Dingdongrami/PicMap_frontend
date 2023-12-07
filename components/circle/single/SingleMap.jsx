import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRef, useState, useCallback, useEffect } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Map } from '../../../screens/MyPage/Map/Map';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { INIT } from './examples';
import React from 'react';
import { useRecoilState } from 'recoil';
import { isPhotoUploadingState } from '../../../stores/circle-store';
import { s3BaseUrl } from '../../../constants/config';

import ForCircleMap from '../../MapMarker/ForCircleMap';

const ZOOM_THRESHOLD = 10;

const getZoomFromRegion = region => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};

//singlemap을 따로 export 할 시에 에러발생...함수 다시 생각해봐야할듯
export const SingleMap = ({ data }) => {
  const navigation = useNavigation();
  const map = useRef(null);
  const [zoom, setZoom] = useState(18);
  const [markers, setMarkers] = useState([{ id: 0, latitude: INIT.latitude, longitude: INIT.longitude, image: '' }]);
  const [region, setRegion] = useState({
    latitude: INIT.latitude,
    longitude: INIT.longitude,
    latitudeDelta: INIT.latitudeDelta,
    longitudeDelta: INIT.longitudeDelta,
  });
    //사진업로드 중일때 지도도 spinning 하기
    const [isPhotoUploading, setIsPhotoUploading] = useRecoilState(isPhotoUploadingState);

  const generateMarkers = () => {
    const markersArray = [];
    for (let i = 0; i < data?.length; i++) {
      if (data[i].latitude && data[i].longitude) {
        markersArray.push({
          id: i,
          latitude: data[i]?.latitude,
          longitude: data[i]?.longitude,
          thumbnail: s3BaseUrl + data[i]?.filePath,
        });
      }
    }
    setMarkers(markersArray);
  };
  useEffect(() => {
    data && 
    generateMarkers();
  }, [data]);

  const onRegionChangeComplete = newRegion => {
    setZoom(getZoomFromRegion(newRegion));
    setRegion(newRegion);
  };

  if (data) {
    return (
      <View style={{width: "100%", height:"100%"}}>
        {data && (
          <ForCircleMap
            clusterColor="#00B386"
            ref={map}
            album={data}
            mapType="standard"
            style={styles.mapContainer}
            initialRegion={region}
            onRegionChangeComplete={onRegionChangeComplete}>
            {markers.map(item => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                imageUri={item.thumbnail}
                tracksViewChanges={false}>
                <Image
                  source={item.thumbnail}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                  }}
                />
              </Marker>
            ))}
          </ForCircleMap>
        )}
      </View>
    );
  }
};

export const MemorizedSingleMap = React.memo(SingleMap);
