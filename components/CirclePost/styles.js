import { StyleSheet } from 'react-native';
import { COLORS } from '#constants/colors';

export const styles = StyleSheet.create({
  circle: {
    width: 337,
    height: 225,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: COLORS.brown7,
    marginBottom: 24,
  },
  circleName: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 25.2,
    borderBottomColor: COLORS.brown7,
    borderBottomWidth: 0.5,
  },
  circleNameText: {
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    color: COLORS.brown7,
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
