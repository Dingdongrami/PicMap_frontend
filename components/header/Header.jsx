import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from "./styles";

export const Header = ({navigation, title}) => {
  return(
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontFamily: 'IropkeBatang'}}>PicMap</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} >
          <Ionicons name="search-sharp" size={25} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TimeLine')} >
          <FontAwesome name="globe" size={24} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')} >
          <FontAwesome name="user-circle-o" size={24} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


