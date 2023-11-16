import { View, Text, Pressable, ScrollView , Animated, TouchableWithoutFeedback  } from 'react-native';
import { useState, useMemo } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import { SingleMap } from '../../../components/circle/single/SingleMap';
import { SinglePhotoIcon } from '../../../components/circle/album/SinglePhotoIcon';
import { OthersProfile } from '../../../components/MyProfile/OthersProfile';
import { AddMethod } from '../../../components/circle/album/AddMethod';

export const SingleCircle = ({ route }) => {
  const [ isReady, setIsReady ] = useState(splashState);
  const [ isMap, setIsMap ] = useState(true);
  const [ selection, setSelection ] = useState(false);
  const [ isExpanded, setIsExpanded ] = useState(null);
  //써클의 id값 찾아내기
  const { itemId } = route.params;
  const album = Array(90).fill();
  const groupedData = album.map((item, index) => ({
    id: index,
  }));
  // const itemsPerRow = 3;
  // for(let i=0; i<album.length; i+=itemsPerRow) {
  //   groupedData.push(album.slice(i, i+itemsPerRow));
  // }

  const handleScroll = (e) => {
    //스크롤 위치를 확인
    const yOffset = e.nativeEvent.contentOffset.y;
    if(yOffset > 110){
      setIsMap(false);
    }else if(yOffset <= 0){
      setIsMap(true);
    }
  };
  const changeSelection = () => {
    //item값들의 checkbox
    setSelection(!selection);
  };
  const selectOptions = useMemo(
    () => [
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
        onPress: changeSelection
      }
  ]);

  if(!isReady) {
    return <SplashUI />
  } 
  else{
    return(
      <View style={{flex:1, flexDirection: 'column', backgroundColor: '#fff'}}>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          <View style={styles.personBox}> 
            <OthersProfile />
          </View>
          <View style={styles.mapContainer}>
            { isMap && <SingleMap/> }
          </View>
          <View style={styles.wrapper} >
            <Text style={styles.imageText}>사진</Text>
              { !selection ? 
                <Pressable onPress={changeSelection} >
                  <Text style={styles.optionText}>선택</Text>
                </Pressable>
                : 
                <View style={{flexDirection: 'row', marginLeft: 157, gap: 16 }}>
                  {selectOptions.map((item, index) => (
                    <Pressable key={index} onPress={item?.onPress}>
                      <Text style={styles.optionText2}>{item.text}</Text>
                    </Pressable>
                  ))}
                </View>
              }
          </View>
          <View style={styles.albumContainer}>
            <SinglePhotoIcon photoData={groupedData} isSelected={selection}/>
          </View>
        </ScrollView>
        <AddMethod onPress={()=>setIsExpanded(!isExpanded)} expansion={isExpanded} selection={selection} />
      </View>
    );
  }
};


