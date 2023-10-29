import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CreateCircleBtn = () => {
  const navigation = useNavigation();
  
  const handleButton = () => {
    alert('써클등록 화면으로 이동합니다.');
    navigation.navigate('CircleCreate');
  };

  return(
    <View style={styles.overlay} >
      <TouchableOpacity onPress={handleButton}>
        <Image source={require('../../assets/icons/function_add_btn.png')} style={{ width:55, height:55}} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 507,
    left: 23,
    right: 312,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})