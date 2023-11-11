import { Pressable, Text, View, Image } from 'react-native';
import { useState } from 'react';
import { styles } from './styles';
import Checkbox from 'expo-checkbox';

export const SinglePhotoIcon = ({photoData, isSelected}) => {
  const [ checkedPhotos, setCheckedPhotos ] = useState([]);
  return(
    <View>
      {photoData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {row.map((item, index) => (
            <Pressable key={index} >
              {!isSelected ?
                <View style={styles.imageContainer}>
                  <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
                </View>
                : 
                <View style={styles.imageCon4check}>
                  <Checkbox 
                    key={3*rowIndex+index}
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
            </Pressable>
          ))}
        </View>
      ))}
    </View>

  );
};

