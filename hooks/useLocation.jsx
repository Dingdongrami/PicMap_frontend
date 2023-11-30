import * as Location from 'expo-location';
import { Alert, Linking } from 'react-native';

const useLocation = () => {
  const [locationStatus, requestLocationPermission] = Location.useForegroundPermissions();

  const getLocationPermission = async () => {
    if (locationStatus !== 'granted') {
      const permissionResponse = await requestLocationPermission();
      return permissionResponse.granted;
    }
    if (locationStatus === 'denied') {
      Alert.alert('위치 권한이 필요합니다.', '설정에서 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        { text: '설정으로 이동', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }
  };

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    return location;
  };

  return { getLocationPermission, getLocation };
};

export default useLocation;
