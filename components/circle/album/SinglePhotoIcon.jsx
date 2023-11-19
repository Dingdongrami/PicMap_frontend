import { Pressable, Text, View, Image, FlatList } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

export const SinglePhotoIcon = ({ isSelected, index }) => {
  const [checkedPhotos, setCheckedPhotos] = useState([]);
  const navigation = useNavigation();
  const clickPhoto = index => {
    navigation.navigate('PhotoCom', { index });
  };
  return (
    <View style={styles.albumContainer} >
      <View style={styles.photoRow}>
        <View key={index}>
          {!isSelected ? (
            <Pressable onPress={() => clickPhoto(index)}>
              <View style={styles.imageContainer}>
                <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
              </View>
            </Pressable>
          ) : ( 
            <View style={styles.imageCon4check}>
              <Checkbox
                value={checkedPhotos[index]}
                onValueChange={() => {
                  const itemIndex = index;
                  const newCheckedPhotos = [...checkedPhotos];
                  newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                  setCheckedPhotos(newCheckedPhotos);
                }}
                color={checkedPhotos ? '#D6D3D1' : undefined}
                style={styles.checkbox}
              />
              <Image source={require('../../../assets/icons/image.png')} style={styles.image4check} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
