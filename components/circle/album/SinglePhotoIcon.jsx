import { Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { selectState } from '../../../stores/circle-selection';
import { useRecoilState } from 'recoil';
import { Image } from 'expo-image';
import { s3BaseUrl } from '../../../constants/config';

export const SinglePhotoIcon = ({ item }) => {
  const [selection, setSelection] = useRecoilState(selectState);
  const [checkedPhotos, setCheckedPhotos] = useState([]);
  const navigation = useNavigation();

  const clickPhoto = item => {
    console.log(item.photoId);
    navigation.navigate('PhotoCom', { photoId: item.photoId });
  };
  // selection이 false가 되면 checkedPhotos를 초기화
  useEffect(() => {
    if (!selection) {
      setCheckedPhotos([]);
    }
  }, [selection]);

  return (
    <View style={styles.albumContainer}>
      <View style={styles.photoRow}>
        <Pressable onPress={() => clickPhoto(item.photoId)}>
          <View style={styles.imageContainer}>
            {selection && (
              <Checkbox
                value={checkedPhotos[item.photoId]}
                onValueChange={() => {
                  const itemIndex = item.photoId;
                  const newCheckedPhotos = [...checkedPhotos];
                  newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                  setCheckedPhotos(newCheckedPhotos);
                  console.log(itemIndex);
                }}
                color={checkedPhotos ? '#D6D3D1' : undefined}
                style={styles.checkbox}
              />
            )}
            <Image source={s3BaseUrl + item.filePath} style={styles.imageIcon} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};
