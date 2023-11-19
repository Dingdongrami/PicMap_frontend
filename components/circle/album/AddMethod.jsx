import { View, Pressable, StyleSheet, Image, Animated } from "react-native";
import { useRecoilState } from "recoil";
import { selectState } from "../../../stores/circle-selection";

export const AddMethod = ({onPress, expansion}) => {
  const [selection] = useRecoilState(selectState);
  const imageStyles= [styles.overlay];
  if(expansion){
    const animation = new Animated.Value(expansion ? 0 : 1);

    Animated.timing(animation, {
      toValue: expansion ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start();

    const rotateInterPolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg']
    });
    const animatedStyles = { transform: [{ rotate: rotateInterPolate }] };
    imageStyles.push(animatedStyles);
  }
  if(!selection) {
    return(
      <Pressable onPress={onPress}>
        { expansion ?
          <View style={styles.addition}>
            <Pressable>
              <Image source={require('../../../assets/icons/album_add.png')} contentFit='cover' style={styles.icon1} />
            </Pressable>
            <Pressable>
              <Image source={require('../../../assets/icons/camera_add.png')} contentFit='cover' style={styles.icon2} />
            </Pressable>
          </View>
          :
          undefined
        }
        <Animated.View style={imageStyles}>
          <Image source={require('../../../assets/icons/function_add_btn.png')} style={styles.imageStyle} />
        </Animated.View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 23,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageStyle:{
    width: 55, 
    height: 55
  },
  addition: {
    position: 'absolute',
    left: 23,
    bottom: 82,
    width: 61,
    height: 136,
    borderRadius: 30,
    backgroundColor: 'rgba(231, 229, 228, 0.80)',
    flexDirection: 'column',
    paddingTop: 27,
    alignItems: 'center',
    gap: 30
  },
  icon1: {
    width: 30,
    height: 30
  },
  icon2: {
    width: 30,
    height: 23,
  }
});