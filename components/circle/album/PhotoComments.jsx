import { Text, View, Image, Pressable } from 'react-native';
import { comStyle } from "./styles";
import { useState } from "react";
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

//사진클릭시 접속하는 화면
export const PhotoComments = () => {
  const [ heart, setHeart ] = useState(false);
  const [ isScrolled, setIsScrolled ] = useState(false);
  const height = useSharedValue(65);
  const scrollUp = () => {
    if(!isScrolled){
    height.value = withSpring(height.value + 151);
    }else{
      height.value = withSpring(65);
    }
    setIsScrolled(!isScrolled);
  }
  return(
    <Animated.View style={[comStyle.scrollCon, {height: height}]}  >
      <Pressable onPress={scrollUp}>
        <View style={comStyle.commuBox}>
          <View style={comStyle.commentBox}>
            <Image source={require('../../../assets/icons/comment.png')} contentFit='cover'/>
            <Text>25</Text>
          </View>
          <View style={comStyle.commentBox}>
            <Pressable onPress={()=>setHeart(!heart)}>
              { heart ? 
                <Image source={require('../../../assets/icons/heart_unfilled.png')} contentFit='cover'/>
                :
                <Image source={require('../../../assets/icons/heart_filled.png')} contentFit='cover'/>
              }
            </Pressable>
            <Text>25</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
    )
}