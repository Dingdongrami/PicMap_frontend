import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 8,
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 500,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    gap: 13,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 500,
    borderColor: '#44403C',
    borderWidth: 0.5,
  },
});
