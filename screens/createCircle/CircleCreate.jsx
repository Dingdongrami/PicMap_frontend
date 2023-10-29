import { useNavigation } from '@react-navigation/native';
import { Text, View, Button } from 'react-native'; 

export const CircleCreate = () => {
  const navigation = useNavigation();
  return(
    <View style={{ marginTop: 50 }}>
      <Text>써클 등록하는 화면입니다.</Text>
      <Button title="돌아가기" onPress={() => navigation.navigate('CreateCircleBtn')} />
    </View>
  )
}