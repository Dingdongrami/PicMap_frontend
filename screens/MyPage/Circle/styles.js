import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 0.5,
    borderColor: '#44403C',
    backgroundColor: 'white',
    marginTop: 40,
    paddingTop: 6,
    paddingHorizontal: 9,
  },
  splashContainer: {
    flex: 1,
    backgroundColor:
      'linear-gradient(0deg, var(--pink2_40, rgba(255, 227, 224, 0.40)) 0%, var(--pink2_40, rgba(255, 227, 224, 0.40)) 100%), #FFF',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberContainer: {
    borderWidth: 0.5,
    borderColor: '#44403C',
    width: 164,
    height: 164,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontFamily: 'IropkeBatang',
    paddingTop: 20.5,
  },
  splashText: {
    color: '#44403C',
    fontSize: 13,
    fontFamily: 'IropkeBatang',
    marginTop: 8,
  },
  splashImage: {
    marginTop: 32,
    height: 24,
    width: 113,
  },
  personCircle: {
    marginHorizontal: 5.5,
    marginVertical: 6,
    borderWidth: 0.5,
    borderColor: '#78716C',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'IropkeBatang',
    fontSize: 13,
  },
  personBox: {
    paddingVertical: 2,
    height: 56,
    // borderWidth: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    width: '100%',
    height: 221,
    marginTop: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: 30,
  },
  imageText: {
    fontFamily: 'IropkeBatang',
    marginLeft: 16,
  },
  optionButton: {
    marginLeft: 309,
  },
  optionText: {
    fontFamily: 'IropkeBatang',
    backgroundColor: '#FFECEA',
  },
  albumContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 3,
    // zIndex: 1,
  },
  photoRow: {
    flexDirection: 'row',
  },
});
