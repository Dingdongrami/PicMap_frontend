import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
  },
  mapContainer: {
    width: "100%",
    height: "100%",

  },
})
