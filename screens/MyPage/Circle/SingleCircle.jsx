import { View, Text, Pressable } from 'react-native';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import { SingleMap, SinglePhotoIcon, OthersProfile, AddMethod } from '../../../components/circle';
import { FlatList } from 'react-native-gesture-handler';
import { selectState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';

export const SingleCircle = ({ route }) => {
  const [isReady, setIsReady] = useState(splashState);
  const [isMap, setIsMap] = useState(true);
  const [isExpanded, setIsExpanded] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState([
    {id: 0, source: ""}
  ]);
  //써클의 id값 찾아내기
  const { itemId } = route.params;
  const album = Array(90).fill();
  const groupedData = album.map((item, index) => ({
    id: index,
  }));
  const keyExtractor = (groupedData) => String(groupedData.id);
  // const imagesArray = [];

  // const assetImages = useCallback(() => {
  //   // const imagesArray = [];
  //   for(let index=0; index<30; index++){
  //     imagesArray.push({
  //       id: index,
  //       source: `../../../assets/example/ex${index+1}.png`
  //     });
  //   }
  //   setCurrentPhoto(imagesArray);
  // }, []);

  // useEffect(() => {
  //   assetImages();
  //   // console.log(JSON.stringify(currentPhoto.source));
  //   console.log(currentPhoto);
  // }, []);
  const imagesArray = [
    { id: 0, source: require('../../../assets/example/ex1.png') },
    { id: 1, source: require('../../../assets/example/ex2.png') },
    { id: 2, source: require('../../../assets/example/ex3.png') },
    { id: 3, source: require('../../../assets/example/ex4.png') },
    { id: 4, source: require('../../../assets/example/ex5.png') },
    { id: 5, source: require('../../../assets/example/ex6.png') },
    { id: 6, source: require('../../../assets/example/ex7.png') },
    { id: 7, source: require('../../../assets/example/ex8.png') },
    { id: 8, source: require('../../../assets/example/ex9.png') },
    { id: 9, source: require('../../../assets/example/ex10.png') },
    { id: 10, source: require('../../../assets/example/ex11.png') },
    { id: 11, source: require('../../../assets/example/ex12.png') },
  ]

  const handleScroll = e => {
    //스크롤 위치를 확인
    const yOffset = e.nativeEvent.contentOffset.y;
    if (yOffset > 110) {
      setIsMap(false);
    } else if (yOffset <= 0) {
      setIsMap(true);
    }
  };

  if (!isReady) {
    return <SplashUI />;
  } else {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
        <FlatList
          data={imagesArray}
          numColumns={3}
          keyExtractor={item => item.id}
          ListHeaderComponent={HeaderComponent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          //만약 실제이미지가 데이터에 존재하면 바뀌게 될 함수
          // renderItem={({item})=><SinglePhotoIcon index={item.id}/>}
          renderItem={({item})=><SinglePhotoIcon index={item.id} photo={item}/>}
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
