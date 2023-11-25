import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { CirclePost } from '../../../components/CirclePost';
import { styles } from './styles';

export const Post = () => {
  const [data, setData] = useState(Array(10).fill({}));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CirclePost />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </SafeAreaView>
  );
};
