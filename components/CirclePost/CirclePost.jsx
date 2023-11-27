import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
import { getPhotoBorderStyle } from '../../utils/getPhotoBorderStyles';

const CirclePost = ({ item }) => {
  return (
    <View style={styles.circle}>
      <View style={styles.circleName}>
        <Text style={styles.circleNameText}>{item.name}</Text>
      </View>
      <View style={styles.photoContainer}>
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <View key={index} style={[styles.photo, getPhotoBorderStyle(index)]}></View>
          ))}
      </View>
    </View>
  );
};

export default CirclePost;
