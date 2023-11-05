import { MarkerClusterer, GridAlgorithm } from '@googlemaps/markerclusterer';
import { View, Text } from 'react-native';
import { useState } from 'react';

const [ root, setRoot ] = useState(null);
const google = window.google;

export const MapImage = () => {
  const map = new google.maps.Map(root.value, {
    zoom: 10,
    minZoom: 2,
    maxZoom: 19,
    center: new google.maps.LatLng(-8.447168, 115.1083)
  });
  
  return(
    <View>
      <Text></Text>
    </View>
  )
}