import { View, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { CircleRoom } from '../../components/circle';
import React, { useEffect, useState } from 'react';
import { data } from '../../data/circle-dummy';

export const TimeLine = () => {
  const [filteredData, setFilteredData] = useState([]); // public: true

  useEffect(() => {
    setFilteredData(data.filter(item => item.public === true));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CircleRoom item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
