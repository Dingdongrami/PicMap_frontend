import { View, Text } from 'react-native';
import { styles } from './styles';

export const CircleRoom = ({ item }) => {
  return(
    <View style={styles.circleRoom}>
      <View style={styles.circlePhoto} />
      <View style={styles.circleName}>
        <Text style={styles.circleNameText} >{item.name}</Text>
      </View>
    </View>
  )
}
