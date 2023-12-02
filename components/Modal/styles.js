import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    bottom: 0,
    position: 'absolute',
    paddingBottom: 28,
  },
  modalLine: {
    width: 46,
    height: 5,
    borderRadius: 10,
    backgroundColor: '#D6D3D1',
    marginTop: 12,
    marginBottom: 20,
  },
  modalButtonContainer: {
    width: windowWidth,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 33,
    gap: 18,
    height: 55,
  },
  modalText: {
    fontFamily: 'IropkeBatang',
    fontSize: 16,
    color: '#44403C',
    textAlign: 'center',
  },
  circleInfoContainer: {
    width: 305,
    alignItems: 'flex-start',
  },
  circleImage: {
    width: 311,
    height: 311,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 20,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  circleNoImageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 311,
    height: 311,
    marginTop: 8,
    marginBottom: 20,
    borderBottomColor: '#44403C',
    borderWidth: 0.5,
  },
  circleNoImage: {
    width: 67,
    height: 47,
  },
  circleName: {
    fontFamily: 'IropkeBatang',
    fontSize: 17,
    color: '#44403C',
    marginBottom: 14.4,
    backgroundColor: '#FFECEA',
  },
  circleDescription: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
    color: '#44403C',
    // marginBottom: 27,
  },
});

export const editStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    width: 280,
    height: 180,
  },
  title: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
    color: '#78716C',
    textAlign: 'center',
    marginTop: 18,
  },
  inputBox: {
    marginTop: 14,
    width: 230,
    height: 38,
    borderWidth: 0.5,
    borderBottomColor: '#D6D3D1',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelBox: {
    width: 6,
    height: 5.7,
    // position: 'absolute',
    marginLeft: 210,
  },
  optionBox: {
    marginTop: 19,
    display: 'flex',
    flexDirection: 'row',
    gap: 9,
  },
  singleBox1: {
    width: 115,
    height: 44,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderBottomColor: '#A8A29E',
    justifyContent: 'center',
  },
  singleBox2: {
    width: 115,
    height: 44,
    backgroundColor: '#FFECEA',
    borderWidth: 0.5,
    borderBottomColor: '#A8A29E',
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
    color: '#78716C',
    textAlign: 'center',
  },
});
