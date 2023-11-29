import React, { memo } from 'react';
import { Text, View, Pressable } from 'react-native';
import { styles } from './styles';
import { Marker } from 'react-native-maps';
import { returnMarkerStyle } from './helpers';

const ClusteredMarker = ({
  geometry,
  properties,
  onPress,
  clusterColor,
  clusterTextColor,
  clusterFontFamily,
  tracksViewChanges,
}) => {
  const points = properties.point_count;
  const { width, height, fontSize, size } = returnMarkerStyle(points);

  return (
    <Marker
      key={`${geometry.coordinates[0]}_${geometry.coordinates[1]}`}
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      style={{ zIndex: points + 1 }}
      onPress={onPress}
      tracksViewChanges={tracksViewChanges}>
      <Pressable activeOpacity={0.5} style={[styles.container, { width, height }]} >
        <View
          style={[
            styles.wrapper,
            {
              backgroundColor: clusterColor,
              width,
              height,
              borderRadius: width / 2,
            },
          ]}
        />
        <View
          style={[
            styles.cluster,
            {
              backgroundColor: clusterColor,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}>
          <Text
            style={[
              styles.text,
              {
                color: clusterTextColor,
                fontSize,
                fontFamily: clusterFontFamily,
              },
            ]}>
            {points}
          </Text>
        </View>
      </Pressable>
    </Marker>
  );
};

export default memo(ClusteredMarker);