import { FlatList, View } from 'react-native';
import { CircleRoom } from '../../components/circle';
import { styles } from './styles';
import { data } from '../../data/circle-dummy';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicCircle } from '../../api/circleApi';

const CircleSearch = () => {
  const { data } = useQuery({
    queryKey: ['circle', 'search'],
    queryFn: () => fetchPublicCircle(),
  });

  return (
    <View style={[styles.container, styles.circleContainer]}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 0.5 }}>
            <CircleRoom circle={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CircleSearch;
