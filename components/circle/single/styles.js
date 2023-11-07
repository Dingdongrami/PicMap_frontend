import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    width: width,
    height: height,
    zIndex: 2,
    backgroundColor: "transparent",
  },
})

    // flexDirection: 'row',
    // width: "100%",
    // position: 'absolute',
    // width: "100%",
    // minHeight: 220,
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // borderWidth: 1, 
    // marginTop: 8