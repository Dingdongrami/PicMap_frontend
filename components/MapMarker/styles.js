import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    position: 'absolute',
    opacity: 0.5,
    zIndex: 0,
  },
  cluster: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontWeight: 'bold',
  },
})

export const photoStyles = StyleSheet.create({
  albumContainer: {
    width: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  imageContainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    width: "100%",
    height: 180,
    borderWidth: 0.5,
    borderColor: '#44403C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});