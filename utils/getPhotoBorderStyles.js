export const getPhotoBorderStyle = index => {
  switch (index) {
    case 0:
      return {
        borderTopLeftRadius: 20,
      };
    case 1:
      return {
        borderTopRightRadius: 20,
      };
    case 2:
      return {
        borderBottomLeftRadius: 20,
      };
    case 3:
      return {
        borderBottomRightRadius: 20,
      };
  }
};
