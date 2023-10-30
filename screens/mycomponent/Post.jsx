import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import CirclePost from '../../components/CirclePost/CirclePost';

export const Post = () => {
  const [data, setData] = useState(Array(10).fill({}));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <CirclePost />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: 35,
  },
});
