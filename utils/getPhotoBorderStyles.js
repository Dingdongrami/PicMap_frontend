import { COLORS } from '../constants/colors';

export const getPhotoBorderStyle = index => {
  switch (index) {
    case 0:
      return {
        borderBottomColor: COLORS.brown3,
        borderBottomWidth: 0.5,
        borderRightColor: COLORS.brown3,
        borderRightWidth: 0.5,
      };
    case 1:
      return {
        borderBottomColor: COLORS.brown3,
        borderBottomWidth: 0.5,
      };
    case 2:
      return {
        borderRightColor: COLORS.brown3,
        borderRightWidth: 0.5,
      };
    default:
      return {};
  }
};
