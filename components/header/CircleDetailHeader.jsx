import { View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { useRecoilState } from 'recoil';
import { userState } from '../../stores/user-store';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import { s3BaseUrl } from '../../constants/config';
import HeaderIcon from './HeaderIcon';

const CircleDetailHeader = ({ onPress }) => {
  const navigation = useNavigation();
  const GoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={GoBack}>
        <Image source={require('../../assets/icons/header_back.png')} style={styles.backHeader} />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <HeaderIcon />
        <TouchableOpacity onPress={onPress}>
          <Image source={require('../../assets/icons/circle_array_btn.png')} style={styles.rightHeader} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircleDetailHeader;
