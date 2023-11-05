import { Marker, PROVIDER_GOOGLE, View } from 'react-native-maps';
import MapView from 'react-native-maps';
import { useState, useRef } from 'react';
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

  const pinchRef = useRef(null);
 
  //지도확대 동작 감지함수
  const onPinchEvent = (e) => {
    if(e.nativeEvent.state === State.ACTIVE && e.nativeEvent.scale > 1.5){
      setIsZoomed(true);
      navigation.navigate('CircleMap');
    }
  }

  return(
    <View style={styles.container} onLayout={onLayout} >
      <PinchGestureHandler 
        onGestureEvent={onPinchEvent}
        ref={pinchRef}>
        <MapView
          style={styles.mapContainer}
          resizeMode="cover"
          initialRegion={{
            latitude: 37.580112,
            longitude: 126.977166,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: 37.580112,
              longitude: 126.977166,
            }}
          />
        </MapView>  
      </PinchGestureHandler>
    </View>
    
  );
};