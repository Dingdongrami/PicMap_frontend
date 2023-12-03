import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 8,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 500,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 13,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 500,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  rightHeaderWrapper: {
    justifyContent: 'center',
    height: 18,
  },
  rightHeader: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  backHeader: {
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  mapModal: {
    width: windowWidth,
    borderTopEndRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user_add: {
    width: 21.5,
    height: 21.5,
  },
  user_array: {
    width: 16,
    height: 16,
  },
  circle_name: {
    width: 22,
    height: 22,
    opacity: 1,
  },
  circle_none: {
    width: 22,
    height: 22,
    opacity: 0,
  },
});
