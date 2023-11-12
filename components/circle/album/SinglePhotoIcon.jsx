import { Pressable, Text, View, Image } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

export const SinglePhotoIcon = ({photoData, isSelected}) => {
  const [ checkedPhotos, setCheckedPhotos ] = useState([]);
  const navigation = useNavigation();
  const clickPhoto = (index) => {
    navigation.navigate('PhotoCom', {index});
  }
  return(
    <View>
      {photoData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {row.map((item, index) => (
            <View  key={index}>
              {!isSelected ?
                <Pressable onPress={()=>clickPhoto(3*rowIndex + index)} >
                  <View style={styles.imageContainer} >
                    <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
                  </View>
                </Pressable>
                : 
                <View style={styles.imageCon4check}>
                  <Checkbox 
                    value={checkedPhotos[3*rowIndex+index]}
                    onValueChange={() => {
                      const itemIndex = 3*rowIndex+index;
                      const newCheckedPhotos = [...checkedPhotos];
                      newCheckedPhotos[itemIndex] = !newCheckedPhotos[itemIndex];
                      setCheckedPhotos(newCheckedPhotos);
                    }}
                    color={checkedPhotos ? '#D6D3D1': undefined}
                    style={styles.checkbox}
                  />
                  <Image source={require('../../../assets/icons/image.png')} style={styles.image4check} />
                </View>
              }
            </View>
          ))}
        </View>
      ))}
    </View>

  );
};

