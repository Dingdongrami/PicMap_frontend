import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { useState, useRef, useEffect } from 'react';
import { styles } from '../styles';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

//singlemap을 따로 export 할 시에 에러발생...함수 다시 생각해봐야할듯
export const SingleMap = () => {
  const [ isZoomed, setIsZoomed ] = useState(false);
  const navigation = useNavigation();
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  // const pinchRef = useRef(null);
  const mapRef = useRef(null);
 
  //지도확대 동작 감지함수
  const onPinchEvent = (e) => {
    if(e.nativeEvent.state === State.ACTIVE && e.nativeEvent.scale > 1.5){
      setIsZoomed(true);
      navigation.navigate('CircleMap');
    }
  }

  const onMapReady = () => {
    console.log('onMapReady called'); 
    if(mapRef.current){
      mapRef.current.animateToRegion({
        latitude: 37.580112,
        longitude: 126.977166,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };
  const handleError = (error) => {
    console.log('Map error:', error);
  };


  
  // useEffect(() => {
  //   if(mapRef.current) {
  //     mapRef.current.animateToRegion({
  //       latitude: 37.580112,
  //       longitude: 126.977166,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01,
  //     });
  //   }
  // }, [mapRef.current]); 
  return(
    // <View style={styles.container} >
    //   <PinchGestureHandler 
    //     onGestureEvent={onPinchEvent}
    //     ref={pinchRef}>
        <MapView
          ref={mapRef}
          style={styles.mapContainer}
          // resizeMode="cover"
          onLayout={onMapReady} 
          provider={PROVIDER_GOOGLE}
          onError={handleError}
          
        >
          <Marker
            coordinate={{
              latitude: 37.580112,
              longitude: 126.977166,
            }}
          />
        </MapView>  
    //   </PinchGestureHandler>
    // </View>
  );
};