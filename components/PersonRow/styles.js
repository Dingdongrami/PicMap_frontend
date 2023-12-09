import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  personRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    borderColor: '#E7E5E4',
    borderBottomWidth: 0.5,
  },
  profileImage: {
    width: 39,
    height: 39,
    borderRadius: 500,
    overflow: 'hidden',
  },
  personWrapper: {
    width: 39,
    height: 39,
    backgroundColor: '#F5F5F4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 500,
    overflow: 'hidden',
  },
  defaultImage: {
    width: 20,
    height: 15,
  },
  username: {
    fontSize: 14,
    fontFamily: 'IropkeBatang',
    color: '#44403C',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  button: {
    width: 12,
    height: 15,
    marginLeft: 'auto',
  },
});
