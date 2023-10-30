import { Text, View, FlatList } from 'react-native';
import { styles } from './styles';
import { CircleRoom } from '../../../components/circle/CircleRoom';
import { useState } from 'react';
import { CreateCircleBtn } from '../../createCircle/CreateCircleBtn';

export const Circle = () => {
  // const [ data, setData ] = useState([]);
  const data = [
    { name: '써클1' },
    { name: '써클2' },
    { name: '써클3' },
    { name: '써클4' },
    { name: '써클5' },
    { name: '써클6' },
    { name: '써클7' },
    { name: '써클8' },
    { name: '써클9' },
    { name: '써클10' },
  ];
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CircleRoom item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      <CreateCircleBtn />
    </View>
  );
};
