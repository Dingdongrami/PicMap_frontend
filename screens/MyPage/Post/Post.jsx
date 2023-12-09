import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { CirclePost } from '../../../components/CirclePost';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';
import { fetchCircle } from '../../../api/circleApi';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshControl } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { splashState } from '../../../stores/splash-store';

export const Post = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circle'],
    queryFn: () => fetchCircle(17),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  // console.log(data);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['circle']);
    setRefreshing(false);
  }, [queryClient]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CirclePost circle={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
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
