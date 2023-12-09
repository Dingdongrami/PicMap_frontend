import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useCallback, useState } from 'react';
import { CirclePost } from '../../../components/CirclePost';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';
import { fetchCircle } from '../../../api/circleApi';
import { Image } from 'expo-image';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { RefreshControl } from 'react-native';

export const Post = ({ route }) => {
  const { user } = route.params;
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circle', user.id],
    queryFn: () => fetchCircle(user.id),
    refetchOnWindowFocus: true,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['circle', user.id]);
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
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>가입한 써클에 사진이 부족해요!</Text>
          </View>
        )}
      />
    </View>
  );
};
