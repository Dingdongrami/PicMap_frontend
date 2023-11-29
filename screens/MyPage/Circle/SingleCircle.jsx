import { View, Text, Pressable } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import { SingleMap, SinglePhotoIcon, OthersProfile, AddMethod } from '../../../components/circle';
import { FlatList } from 'react-native-gesture-handler';
import { selectState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';
import { photoInstance } from '../../../api/instance';
import { useQuery } from '@tanstack/react-query';
import { fetchPhotos } from '../../../api/photoApi';

export const SingleCircle = ({ route }) => {
  const { itemId } = route.params; //써클의 id값 찾아내기
  const [isReady, setIsReady] = useState(splashState);
  const [isMap, setIsMap] = useState(true);
  const [isExpanded, setIsExpanded] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['photo'],
    queryFn: () => fetchPhotos(itemId),
  });

  const handleScroll = e => {
    //스크롤 위치를 확인
    const yOffset = e.nativeEvent.contentOffset.y;
    if (yOffset > 110) {
      setIsMap(false);
    } else if (yOffset <= 0) {
      setIsMap(true);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={{ flex: 0.33 }}>
      <SinglePhotoIcon item={item} />
    </View>
  );

  console.log('data', data);
  if (!isReady) {
    return <SplashUI />;
  } else {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <FlatList
          data={data}
          numColumns={3}
          keyExtractor={item => item.photoId}
          ListHeaderComponent={HeaderComponent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={styles.noPhotoText}>사진이 없네요!</Text>}
        />
        <AddMethod onPress={() => setIsExpanded(!isExpanded)} expansion={isExpanded} />
      </View>
    );
  }
};

const HeaderComponent = () => {
  const [isMap, setIsMap] = useState(true);
  const [selection, setSelection] = useRecoilState(selectState);
  const changeSelection = () => {
    setSelection(!selection);
  };
  const selectOptions = useMemo(() => [
    {
      text: '전체 선택',
      // onPress:
    },
    {
      text: '삭제',
      // onPress
    },
    {
      text: '저장',
      // onPres
    },
    {
      text: '취소',
      onPress: changeSelection,
    },
  ]);
  return (
    <View style={{ marginBottom: 5 }}>
      <View style={styles.personBox}>
        <OthersProfile />
      </View>
      <View style={styles.mapContainer}>{isMap && <SingleMap />}</View>
      <View style={styles.wrapper}>
        <Text style={styles.imageText}>사진</Text>
        {!selection ? (
          <Pressable onPress={changeSelection}>
            <Text style={styles.optionText}>선택</Text>
          </Pressable>
        ) : (
          <View style={{ flexDirection: 'row', gap: 16, marginRight: 16 }}>
            {selectOptions.map((item, index) => (
              <Pressable key={index} onPress={item?.onPress}>
                <Text style={styles.optionText2}>{item.text}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};
