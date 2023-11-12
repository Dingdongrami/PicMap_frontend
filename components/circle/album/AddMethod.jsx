import { View, Pressable, StyleSheet, Image, Animated } from "react-native";
import { useState, useRef } from "react";

export const AddMethod = ({onPress, expansion}) => {
  // const[ isExpanded, setIsExpanded ] = useState(expansion);
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

  return(
    <Pressable onPress={onPress}>
      <Animated.View style={imageStyles}>
        <Image source={require('../../../assets/icons/function_add_btn.png')} style={styles.imageStyle} />
      </Animated.View>
    </Pressable>
  );
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
  }
});