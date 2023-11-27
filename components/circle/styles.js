import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  circleRoom: {
    width: '100%',
    height: 194,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifySelf: 'flex-start',
    marginTop: 18,
  },
  circlePhoto: {
    width: 164,
    height: 164,
    borderRadius: 15,
    borderWidth: 0.5,
    borderBottomColor: '#44403C',
    // borderColor: '#44403C',
  },
  noImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 164,
    height: 164,
    borderWidth: 0.5,
    borderBottomColor: '#44403C',
    // borderColor: '#44403C',
  },
  noImage: {
    width: 45,
    height: 31,
  },
  circleName: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 29,
  },
  circleNameText: {
    fontFamily: 'IropkeBatang',
    backgroundColor: '#FFECEA',
  },
});
