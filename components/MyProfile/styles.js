import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    marginVertical: 7,
    marginHorizontal: 32,
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: '50%',
    borderColor: COLORS.brown7,
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
  },
  onelineText: {
    fontFamily: 'IropkeBatang',
    fontSize: 12,
    marginTop: 13,
    marginBottom: 15,
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
    backgroundColor: COLORS.pink1,
  },
  buttonText: {
    fontFamily: 'IropkeBatang',
    fontSize: 11.5,
    color: COLORS.brown7,
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
