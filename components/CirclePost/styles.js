import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  circle: {
    width: 337,
    height: 225,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#44403C',
    marginTop: 24,
  },
  circleName: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 25.2,
    borderBottomColor: '#44403C',
    borderBottomWidth: 0.5,
  },
  circleNameText: {
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    color: '#44403C',
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  photo: {
    width: 168,
    height: 99,
  },
});
