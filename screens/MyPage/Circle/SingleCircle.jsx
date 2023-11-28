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

export const SingleCircle = ({ route }) => {
  const [isReady, setIsReady] = useState(splashState);
  const [isMap, setIsMap] = useState(true);
  const [isExpanded, setIsExpanded] = useState(null);
  const [photos, setPhotos] = useState([]);

  //써클의 id값 찾아내기
  const { itemId } = route.params;
  const album = Array(90).fill();
  const groupedData = album.map((item, index) => ({
    id: index,
  }));

  const getPhotos = async () => {
    //써클의 사진들을 가져오는 함수
    const response = await photoInstance.get(`get/circle/${itemId}`);
    console.log(response.data);
    setPhotos(response.data);
  };

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

  useEffect(() => {
    getPhotos();
  }, []);

  if (!isReady) {
    return <SplashUI />;
  } else {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <FlatList
          data={photos}
          numColumns={3}
          keyExtractor={item => item.photoId}
          ListHeaderComponent={HeaderComponent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={renderItem}
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
    <View>
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
