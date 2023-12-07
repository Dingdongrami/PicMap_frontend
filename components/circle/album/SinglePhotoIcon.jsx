import { Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { circleSelectButtonState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';
import { Image } from 'expo-image';
import { s3BaseUrl } from '../../../constants/config';
import { useMutation } from '@tanstack/react-query';
import { selectedPhotosState } from '../../../stores/circle-store';

export const SinglePhotoIcon = ({ photo }) => {
  const [circleSelectButtonActive, setCircleSelectButtonActive] = useRecoilState(circleSelectButtonState);
  const [selectedPhotos, setSelectedPhotos] = useRecoilState(selectedPhotosState);

  const navigation = useNavigation();

  // 사진 선택하기
  const handleSelectedPhotos = photoId => {
    setSelectedPhotos(prevSelectedPhotos => {
      if (prevSelectedPhotos.includes(photoId)) {
        // 이미 선택된 사진이면 제거
        return prevSelectedPhotos.filter(id => id !== photoId);
      } else {
        // 선택되지 않은 사진이면 추가
        return [...prevSelectedPhotos, photoId];
      }
    });
  };

  const navigateToPhotoCom = () => {
    navigation.navigate('CirclePhotoCom', { photo });
  };

  const togglePhotoSelection = () => {
    if (circleSelectButtonActive) {
      handleSelectedPhotos(photo.id);
    } else {
      navigateToPhotoCom();
    }
  };

  return (
    <Pressable style={styles.albumContainer} onPress={togglePhotoSelection}>
      <View style={styles.photoRow}>
        <Pressable onPress={() => togglePhotoSelection(photo.id)}>
          <View style={styles.imageContainer}>
            {circleSelectButtonActive && (
              <Checkbox
                value={selectedPhotos?.includes(photo.id)}
                onValueChange={() => handleSelectedPhotos(photo.id)}
                color={selectedPhotos?.includes(photo.id) ? '#44403C' : '#FFFFFF'}
                style={styles.checkbox}
              />
            )}
            <Image
              source={s3BaseUrl + photo.filePath}
              style={[styles.imageIcon, selectedPhotos?.includes(photo.id) ? { opacity: 0.5 } : null]}
            />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};
