import { Text, View, Image, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { comStyles } from '../../../components/circle/album/styles';
import { useState } from 'react';
import Animated from 'react-native-reanimated';
import { PhotoComments } from '../../../components/circle/album/PhotoComments';

// const windowHeight = window.
//API연결할지, 사진을 가져올지,,
export const PhotoCom = () => {
  const route = useRoute();
  const index = route.params.index;
  //  const [ heart, setHeart ] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      {/* <Text>{index}에 해당하는 룸입니다</Text> */}
      <View style={comStyles.imageContainer}>
        <Image source={require('../../../assets/icons/image.png')} />
      </View>
      <PhotoComments />
    </View>
  );
};
