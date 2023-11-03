import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

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
    paddingLeft: 33,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    height: 55,
  },
  modalText: {
    fontFamily: 'IropkeBatang',
    fontSize: 16,
    color: '#44403C',
    textAlign: 'center',
  },
});
