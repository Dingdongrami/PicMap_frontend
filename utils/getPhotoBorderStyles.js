export const getPhotoBorderStyle = index => {
  switch (index) {
    case 0:
      return {
        borderBottomColor: '#D6D3D1',
        borderBottomWidth: 0.5,
        borderRightColor: '#D6D3D1',
        borderRightWidth: 0.5,
      };
    case 1:
      return {
        borderBottomColor: '#D6D3D1',
        borderBottomWidth: 0.5,
      };
    case 2:
      return {
        borderRightColor: '#D6D3D1',
        borderRightWidth: 0.5,
      };
    default:
      return {};
  }
};
