import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    paddingTop: 3,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: '50%',
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  rightWrapper: {
    height: '100%',
    justifyContent: 'center',
    marginLeft: 22,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  privateImage: {
    width: 12,
    height: 12,
  },
  usernameText: {
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    color: '#44403C',
  },
  onelineText: {
    fontFamily: 'IropkeBatang',
    fontSize: 12,
    marginTop: 13,
    marginBottom: 15,
    color: '#44403C',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  pinkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    width: 'auto',
    backgroundColor: '#FFECEA',
  },
  buttonText: {
    fontFamily: 'IropkeBatang',
    fontSize: 11.5,
    color: '#44403C',
  },
  editImage: {
    width: 13,
    height: 13,
  },
  friendsImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
});
