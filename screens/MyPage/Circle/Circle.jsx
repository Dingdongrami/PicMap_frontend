import { Text, View, FlatList } from 'react-native';
import { styles } from './styles';
import { CircleRoom, CreateCircleBtn } from '../../../components/circle';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCircle } from '../../../api/circleApi';

export const Circle = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circle'],
    queryFn: fetchCircle,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error!</Text>;

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 0.5 }}>
      <CircleRoom circle={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <CreateCircleBtn />
    </View>
  );
};
