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

export const SinglePhotoIcon = ({ photo, handleSelectedPhotos, selectedPhotos }) => {
  const [circleSelectButtonActive, setCircleSelectButtonActive] = useRecoilState(circleSelectButtonState);

  const navigation = useNavigation();

  const navigateToPhotoCom = () => {
    navigation.navigate('PhotoCom', { photo });
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
                color={selectedPhotos?.includes(photo.id) ? '#D6D3D1' : undefined}
                style={styles.checkbox}
              />
            )}
            <Image source={s3BaseUrl + photo.filePath} style={styles.imageIcon} />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};
