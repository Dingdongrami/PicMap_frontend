import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { CircleRoom } from '../../components/circle';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCircle, fetchPublicCircle } from '../../api/circleApi';

export const TimeLine = () => {
  const publicCircleData = useQuery({
    queryKey: ['public_circle'],
    queryFn: fetchPublicCircle,
    refetchOnWindowFocus: true,
  });

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 0.5 }}>
      <CircleRoom circle={item} />
    </View>
  );

  // if (isSuccess) console.log(data);

  return (
    <View style={styles.container}>
      <FlatList
        data={publicCircleData.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
