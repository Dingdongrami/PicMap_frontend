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
  imageCon4check: {
    flex: 1,
    flexDirection: 'column',
    width: 120,
    height: 120,
    borderWidth: 0.5,
    borderColor: '#44403C',
    // marginHorizontal: 2,
    // marginVertical: 2,
  },
  image4check: {
    width: 45,
    height: 31,
    marginLeft: 37,
    marginTop: 21,
  },
  photoRow: {
    flexDirection: 'row',
  },
  checkbox: {
    marginTop: 4,
    marginLeft: 4,
  },
});

export const comStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    // backgroundColor: '#FFECEA',
    marginBottom: 3,
  },
  commentList: {
    marginVertical: 8,
  },
  comment: {
    fontSize: 14,
    fontFamily: 'IropkeBatang',
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
  },
});
