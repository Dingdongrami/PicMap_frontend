import { Text, View, Image } from 'react-native';
import { useRoute, } from '@react-navigation/native';
import { comStyle } from '../../../components/circle/album/styles';

// const windowHeight = window.
//API연결할지, 사진을 가져올지,,
export const PhotoCom = () => {
   const route = useRoute();
  return(
    <View style={{flex:1}}>
      {/* <Text>{index}에 해당하는 룸입니다</Text> */}
      <View style={comStyle.imageContainer}>
        <Image source={require('../../../assets/icons/image.png')}/>
      </View>
      <View style={comStyle.commuBox}>
        <View style={comStyle.commentBox}>
          <Image source={require('../../../assets/icons/comment.png')} contentFit='cover'/>
          <Text>25</Text>
        </View>
        <View style={comStyle.commentBox}>
          <Image source={require('../../../assets/icons/heart_filled.png')} contentFit='cover'/>
          <Text>25</Text>
        </View>
      </View>
    </View>


  )
}