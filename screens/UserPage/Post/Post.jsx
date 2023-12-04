import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { CirclePost } from '../../../components/CirclePost';
import { styles } from './styles';

export const Post = () => {
  const [data, setData] = useState(Array(10).fill({}));

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CirclePost circle={{ id: 1, name: '더미써클', description: '더미더미', status: 'PRIVATE', thumbnail: '' }} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};
