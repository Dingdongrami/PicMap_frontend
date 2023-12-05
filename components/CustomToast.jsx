import Toast from 'react-native-root-toast';

const CustomToast = ({ text, show }) => {
  if (text && show) {
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: -80,
      animation: true,
      delay: 0,
      backgroundColor: 'rgba(255, 236, 234, 0.90)',
      textColor: '#44403C',
      textStyle: { fontFamily: 'IropkeBatang', fontSize: 15 },
      containerStyle: {
        paddingVertical: 13,
        width: 312,
        borderRadius: 10,
      },
      shadow: false,
    });
  }

  return null; // Toast는 UI를 렌더링하지 않습니다.
};

export default CustomToast;
