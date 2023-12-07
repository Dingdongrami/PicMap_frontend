import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { CircleRoom } from '../../components/circle';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCircle, fetchPublicCircle } from '../../api/circleApi';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshControl } from 'react-native';

export const TimeLine = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const publicCircleData = useQuery({
    queryKey: ['public_circle'],
    queryFn: fetchPublicCircle,
    refetchOnWindowFocus: true,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['public_circle']);
    setRefreshing(false);
  }, [queryClient]);

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#D0C8C8" // 로딩 인디케이터의 색상을 여기서 설정
          />
        }
      />
    </View>
  );
};
