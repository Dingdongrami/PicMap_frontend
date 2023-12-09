import { View, Text, Pressable, Alert } from 'react-native';
import React, { useState, useMemo, useLayoutEffect } from 'react';
import { SplashUI } from './SplashUI';
import { splashState } from '../../../stores/splash-store';
import { styles } from './styles';
import {  SinglePhotoIcon, OthersProfile, AddMethod } from '../../../components/circle';
import { MemorizedSingleMap } from '../../../components/circle/single/SingleMap';
import { FlatList } from 'react-native-gesture-handler';
import { circleSelectButtonState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePhoto, fetchPhotos, fetchSortedPhotos } from '../../../api/photoApi';
import { useNavigation } from 'expo-router';
import CircleHeader from '../../../components/header/CircleHeader';
import { isPhotoUploadingState, selectedPhotosState } from '../../../stores/circle-store';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import { s3BaseUrl } from '../../../constants/config';
import { downloadFromUrl } from '../../../api/downloadApi';

export const SingleCircle = ({ route }) => {
  const navigation = useNavigation();
  const { circle } = route.params; //써클의 id값 찾아내기
  const [isReady, setIsReady] = useState(splashState);
  const [isMap, setIsMap] = useState(true);
  const [isPhotoUploading, setIsPhotoUploading] = useRecoilState(isPhotoUploadingState);
  const queryClient = useQueryClient();

  // 써클의 사진들을 불러오기
  const {
    data: photoData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['photo'],
    queryFn: () => fetchPhotos(circle?.id),
  });

  // 사진 정렬하기
  const photoSortMutation = useMutation({
    mutationFn: args => fetchSortedPhotos(args.circleId, args.sortType),
    onSuccess: data => {
      queryClient.setQueryData(['photo'], data);
      // console.log('실시간 정렬');
    },
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

  // 써클의 사진의 id를 전달받아서 사진을 불러오기
  const renderItem = ({ item, index }) => {
    return (
      <Pressable style={{ flex: 0.3333 }}>
        <SinglePhotoIcon photo={item} album={photoData} />
      </Pressable>
    );
  };

  // photoData가 변하면 isPhotoUploading을 false로 바꾸기
  /*   useEffect(() => {
    setIsPhotoUploading(false);
  }, [photoData, isPhotoUploading]);
 */

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CircleHeader circleName={circle?.name} circleId={circle?.id} status={circle?.status} photoSortMutation={photoSortMutation} />
      ),
    });
  }, [navigation]);

  if (!isReady) {
    return <SplashUI />;
  } else {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', position: 'relative' }}>
        <FlatList
          data={photoData}
          numColumns={3}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <HeaderComponent circleId={circle?.id} photoData={photoData} />}
          ListFooterComponent={
            isPhotoUploading ? (
              <Spinner
                size="large"
                visible={isPhotoUploading}
                textContent={'사진을 업로드 중입니다...'}
                textStyle={{
                  color: '#fff',
                  fontFamily: 'IropkeBatang',
                  fontSize: 16,
                }}
                animation="fade"
                overlayColor="rgba(0, 0, 0, 0.4)"
              />
            ) : null
          }
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={renderItem}
          ListEmptyComponent={() => <Text style={styles.noPhotoText}>사진이 없네요!</Text>}
          columnWrapperStyle={{ paddingHorizontal: Dimensions.get('window').width * 0.01 }}
        />
        <AddMethod circleId={circle?.id} />
      </View>
    );
  }
};

const HeaderComponent = React.memo(({ circleId, photoData }) => {
  const [circleSelectButtonActive, setCircleSelectButtonActive] = useRecoilState(circleSelectButtonState);
  const [selectedPhotos, setSelectedPhotos] = useRecoilState(selectedPhotosState);
  const queryClient = useQueryClient();

  // 사진 삭제하기
  const photoDeleteMutation = useMutation({
    mutationFn: () => deletePhoto(selectedPhotos),
    onSuccess: data => {
      queryClient.invalidateQueries('photo');
      setSelectedPhotos([]);
      setCircleSelectButtonActive(false);
    },
  });

  // 모든 사진 선택하기
  const selectAllPhotos = () => {
    setSelectedPhotos(prevPhotos => {
      // Check if all photos are already selected
      const allSelected = prevPhotos.length === photoData.length;
      // If all photos are selected, deselect all. Else, select all.
      return allSelected ? [] : photoData.map(photo => photo.id);
    });
  };

  // selectedPhotos 비우기
  const clearSelectedPhotos = () => {
    setSelectedPhotos([]);
  };

  const changeSelection = () => {
    setCircleSelectButtonActive(!circleSelectButtonActive);
    clearSelectedPhotos();
  };

  // selectePhotos 저장하기
  const wait = async(ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
  };

  //선택한 사진(selectedPhotos) 로컬로 저장하기
  //console.log(selectedPhotos);=> index번호 출력
  const downloadSelection = () => {
    let item_chunk_size = 20;
    let itemArray = [];
    let newArray = [];
    for(let i=0; i<selectedPhotos.length; i++){
      const downloads = photoData.filter(item => item.id === selectedPhotos[i]);
      itemArray.push(...downloads);
    }
    for (let i = 0; i<itemArray.length; i+= item_chunk_size)  {
      let myChunk = itemArray.slice(i, i+item_chunk_size);
      newArray.push(...myChunk);
    }
    for( let i = 0; i<newArray.length; i++){
      let itemChunk = newArray.map(async item => {
        if(item.filePath){
          const fileProps = {"uri": s3BaseUrl + item.filePath, "filename": item.filePath.split("/").reverse()[0]}
          await downloadFromUrl(
            fileProps
          );
          await Promise.all(itemChunk);
          await wait(1000);
        }
      })
    }
  }

  const selectOptions = useMemo(() => [
    {
      text: '전체 선택',
      onPress: () => {
        selectAllPhotos();
      },
    },
    {
      text: '삭제',
      onPress: () => {
        // 선택된 사진을 삭제할건지 묻는 모달창 띄우기
        Alert.alert('사진 삭제', '선택된 사진을 삭제할까요?', [
          {
            text: '취소',
          },
          {
            text: '삭제',
            onPress: () => {
              // 선택된 사진 삭제하기
              photoDeleteMutation.mutate();
            },
          },
        ]);
      },
    },
    {
      text: '저장',
      onPress: downloadSelection
    },
    {
      text: '취소',
      onPress: changeSelection,
    },
  ]);

  return (
    <View style={{ marginBottom: 5 }}>
      <View style={styles.personBox}>
        <OthersProfile circleId={circleId} />
      </View>
      <View style={styles.mapContainer}>
        <MemorizedSingleMap data={photoData} />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.imageText}></Text>
        {!circleSelectButtonActive ? (
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
});
