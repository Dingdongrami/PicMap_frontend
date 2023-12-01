import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { CirclePost } from '../../../components/CirclePost';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';
import { fetchCircle } from '../../../api/circleApi';

export const Post = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['circle'],
    queryFn: fetchCircle,
    refetchOnWindowFocus: true,
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CirclePost circle={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </SafeAreaView>
  );
};
