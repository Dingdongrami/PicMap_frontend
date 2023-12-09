import { FlatList, View } from 'react-native';
import { CircleRoom } from '../../components/circle';
import { styles } from './styles';
import { data } from '../../data/circle-dummy';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPublicCircle } from '../../api/circleApi';
import { tabState } from '../../stores/tab-store';
import { useRecoilState } from 'recoil';
import { useIsFocused } from '@react-navigation/native';

const CircleSearch = ({filtered, route}) => {
  const [myList, setMyList] = useState([]);
  const [routeName, setRouteName] = useRecoilState(tabState);
  const isFocused = useIsFocused();
  const { data } = useQuery({
    queryKey: ['circle', 'search'],
    queryFn: () => fetchPublicCircle(),
  });

  // console.log(filtered);
  useEffect(() => {
    if(filtered != 0){
      setMyList(filtered);
    }else{
      setMyList(data);
    }
  }, [filtered]);

  useEffect(()=>{
    if(isFocused){
      setRouteName(route.name);
    }
  },[isFocused]);

  return (
    <View style={[styles.container, styles.circleContainer]}>
      <FlatList
        data={myList}
        renderItem={({ item }) => (
          <View style={{ flex: 0.5 }}>
            <CircleRoom circle={item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CircleSearch;
