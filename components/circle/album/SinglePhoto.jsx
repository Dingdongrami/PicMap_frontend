import { Pressable, Text, View, Image } from 'react-native';
import { styles } from './styles';

export const SinglePhoto = () => {
  return(
    <Pressable>
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/icons/image.png')} style={styles.imageIcon} />
      </View>
    </Pressable>
  );
};