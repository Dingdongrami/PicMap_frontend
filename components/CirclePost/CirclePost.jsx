import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
import { getPhotoBorderStyle } from '../../utils/getPhotoBorderStyles';
import { Image } from 'expo-image';
import { s3BaseUrl } from '../../constants/config';
import { useEffect, useState } from 'react';
import { photoInstance } from '../../api/instance';

const CirclePost = ({ item }) => {
  const [photos, setPhotos] = useState([]);
  const circleId = item.id;

  const getPhotos = async () => {
    //써클의 사진들을 가져오는 함수
    const response = await photoInstance.get(`get/circle/${circleId}`);
    console.log(response.data);
    setPhotos(response.data);
  };

  useEffect(() => {
    getPhotos();
  }, []);

  // 조건부 렌더링 수정
  return (
    photos.length > 0 && (
      <>
        <View style={styles.circle}>
          {photos.slice(0, 4).map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image
                style={[styles.photo, , getPhotoBorderStyle(index)]}
                source={s3BaseUrl + photo.filePath} // Image 컴포넌트의 source prop 수정
                contentFit="cover" // contentFit 대신 resizeMode 사용
              />
            </View>
          ))}
        </View>
        <Text style={styles.circleNameText}>{item.name}</Text>
      </>
    )
  );
};

export default CirclePost;
