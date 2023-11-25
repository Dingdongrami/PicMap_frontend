import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchBarWrapper: {
    position: 'relative',
    minWidth: 334,
    height: 49,
    paddingBottom: 9,
    marginTop: 10,
    marginHorizontal: 28,
  },
  searchBar: {
    flex: 1,
    borderColor: '#D6D3D1',
    borderWidth: 0.5,
    borderRadius: 10,
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    paddingLeft: 44,
  },
  searchIcon: {
    position: 'absolute',
    top: 11,
    left: 15,
  },
  clearButton: {
    position: 'absolute',
    top: 11,
    right: 15,
  },
  modalIcon: {
    width: 21.5,
    height: 21.5,
  },
  removeIcon: {
    width: 8,
    height: 8,
  },
  personAddIcon: {
    width: 21.5,
    height: 21.5,
  },
});
