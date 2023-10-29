import { StyleSheet } from "react-native";
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  circleRoom: {
    width: 164,
    height: 194,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    marginTop: 18,
  },
  circlePhoto: {
    width: 164,
    height: 164,
    borderRadius: 15,
    borderWidth: 0.5,
    // borderBottomColor: COLORS.brown7,
    borderBottomColor: '#44403C'
  },
  circleName: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 29,
  },
  circleNameText: {
    fontFamily: 'IropkeBatang',
    backgroundColor: '#FFECEA'
  }
})