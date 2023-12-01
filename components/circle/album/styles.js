import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  albumContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  imageContainer: {
    position: 'relative',
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
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
    borderColor: '#D6ffD3D1',
    // marginHorizontal: 2,
    // marginVertical: 2,
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
    top: 1.5,
    left: 1.5,
    marginTop: 4,
    marginLeft: 4,
    zIndex: 1,
  },
});

export const comStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    contentFit: 'contain',
  },
  scrollCon: {
    borderTopWidth: 0.5,
    borderColor: '#78716C',
    backgroundColor: '#fff',
  },
  commuBox: {
    // height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingLeft: 25,
    gap: 20,
  },
  commentInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 10,
  },
  commentWrapper: {
    alignItems: 'flex-start',
  },
  username: {
    fontSize: 13,
    fontFamily: 'IropkeBatang',
    color: '#44403C',
    // backgroundColor: '#FFECEA',
    marginBottom: 3,
  },
  commentList: {
    marginVertical: 8,
  },
  contentWrapper: {
    width: 250,
    flexDirection: 'row',
  },
  content: {
    fontSize: 14,
    fontFamily: 'IropkeBatang',
    color: '#44403C',
  },
  usernameContent: {
    fontSize: 12,
    fontFamily: 'IropkeBatang',
    backgroundColor: '#FFECEA',
    marginBottom: 3,
    color: '#EB9090',
  },
  button: {
    width: 10,
    height: 15,
    marginLeft: 'auto',
  },
  moreComment: {
    // justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    marginTop: 6,
    borderBottomColor: '#E7E5E4',
    borderBottomWidth: 0.5,
  },
  moreCommentIcon: {
    width: 15,
    resizeMode: 'contain',
  },
  input: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontFamily: 'IropkeBatang',
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: 20,
    // backgroundColor: 'yellow',
  },
  count: {
    paddingHorizontal: 10,
    fontFamily: 'IropkeBatang',
  },
});
