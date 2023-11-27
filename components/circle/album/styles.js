import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  albumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 120,
    height: 120,
    borderWidth: 0.5,
    borderColor: '#44403C',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 2,
    // marginVertical: 2,
  },
  imageIcon: {
    width: 45,
    height: 31,
  },
  realImage:{
    width: "100%",
    height: "100%"
  },
  imageCon4check: {
    flex: 1,
    flexDirection: 'column',
    width: 120,
    height: 120,
    borderWidth: 0.5,
    borderColor: '#44403C',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  image4check: {
    width: "100%",
    height: "100%",
    // marginLeft: 37,
    // marginTop: 21,
  },
  photoRow: {
    flexDirection: 'row',
  },
  checkbox: {
    position: 'absolute',
    marginTop: 4,
    marginLeft: 4,
    zIndex: 2
  },
});

export const comStyle = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollCon: {
    borderWidth: 0.5,
    borderColor: '#78716C',
    backgroundColor: '#fff',
  },
  commuBox: {
    // height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 25,
    gap: 27,
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
