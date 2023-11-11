import { Pressable, Text, View, Image } from 'react-native';
import { styles } from './styles';

export const SinglePhotoIcon = ({photoData}) => {
  const photos = photoData;
  return(
    <View>
      {photos.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.photoRow}>
          {row.map((item, index) => (
            <Pressable key={index}>
              <View style={styles.imageContainer}>
                <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </View>

  );
};