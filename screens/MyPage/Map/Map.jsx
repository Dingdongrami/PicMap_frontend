import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { Marker } from 'react-native-maps';
import { INIT } from './examples';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPhotos } from '../../../api/mapphotoApi';
import { s3BaseUrl } from '../../../constants/config';
import ClusteredMapView from '../../../components/MapMarker/ClusteredMapView';
import { ActivityIndicator } from 'react-native';

const getZoomFromRegion = region => {
  return Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
};

export const Map = () => {
  const map = useRef(null);

  const [markers, setMarkers] = useState([{ id: 0, latitude: INIT.latitude, longitude: INIT.longitude, image: '' }]);
  const [region, setRegion] = useState({
    latitude: INIT.latitude,
    longitude: INIT.longitude,
    latitudeDelta: INIT.latitudeDelta,
    longitudeDelta: INIT.longitudeDelta,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allPhotos'],
    queryFn: () => fetchAllPhotos(17),
    refetchWindowFocus: true,
    // refetchOnMount: true,
  });

  const allPhotoLength = data?.length;
  const generateMarkers = () => {
    const markersArray = [];
    for (let i = 0; i < allPhotoLength; i++) {
      if (data[i].latitude && data[i].longitude) {
        markersArray.push({
          id: i,
          latitude: data[i]?.latitude,
          longitude: data[i]?.longitude,
          thumbnail: s3BaseUrl + data[i]?.filePath,
          photoId: data[i]?.id,
        });
      }
    }
    setMarkers(markersArray);
  };

  // console.log(JSON.stringify(data)+"엥");
  console.log(data);

  const onRegionChangeComplete = newRegion => {
    setZoom(getZoomFromRegion(newRegion));
    setRegion(newRegion);
  };

  useEffect(() => {
    data && generateMarkers();
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D0C8C8" />
      </View>
    );
  } else if (data) {
    return (
      <View style={styles.container}>
        {data && (
          <ClusteredMapView
            clusterColor="#00B386"
            ref={map}
            mapType="standard"
            style={styles.mapView}
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
                photoId={item.photoId}
                tracksViewChanges={false}>
                <Image
                  source={item.thumbnail}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                  }}
                />
              </Marker>
            ))}
          </ClusteredMapView>
        )}
      </View>
    );
  }
};
