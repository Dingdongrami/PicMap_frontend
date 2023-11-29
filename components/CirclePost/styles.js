import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  circle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '94%',
    height: 225,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#44403C',
    marginTop: 24,
    overflow: 'hidden',
  },
  circleNameWrapper: {},
  circleNameText: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FFECEA',
    marginTop: 7,
    width: '100%',
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    color: '#44403C',
    textAlign: 'center',
  },
  photoContainer: {
    width: '100%',
    height: '100%',
  },
  photoWrapper: {
    width: '50%',
    height: 112.5,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});
