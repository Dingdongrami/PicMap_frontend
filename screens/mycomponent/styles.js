import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: COLORS.brown7,
    backgroundColor: 'white',
    marginTop: 50
  },
  map: {
    width: "100%",
    height: "100%"
  },
})