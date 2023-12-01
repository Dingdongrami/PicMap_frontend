import { FlatList, View } from 'react-native';
import { CircleRoom } from '../../components/circle';
import { styles } from './styles';
import { data } from '../../data/circle-dummy';
import { useEffect, useState } from 'react';

const CircleSearch = () => {
  const [filteredData, setFilteredData] = useState([]); // public: true

  useEffect(() => {
    setFilteredData(data.filter(item => item.public === true));
  }, []);

  return (
    <View style={[styles.container, styles.circleContainer]}>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => <CircleRoom circle={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CircleSearch;
