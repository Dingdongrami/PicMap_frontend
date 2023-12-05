import { useCameraPermissions, PermissionStatus, launchCameraAsync } from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const useCamera = onImageCaptured => {
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions(); // 카메라 접근 권한

  async function verifyCameraPermissions() {
    if (cameraPermissionInformation.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestCameraPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('카메라 권한이 필요합니다.', '설정에서 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        { text: '설정으로 이동', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    try {
      const hasPermission = await verifyCameraPermissions();

      if (!hasPermission) {
        return;
      }

      const image = await launchCameraAsync({
        aspect: [16, 9],
        quality: 0.5,
        // allowsEditing: true,
        exif: true,
      });
      if (!image.canceled) {
        // 이미지가 취소되지 않았다면 실행할 코드
        onImageCaptured(image.assets[0]);
      }
      // console.log(image);
    } catch (error) {
      Alert.alert('카메라를 사용할 수 없습니다.', '다시 시도해주세요.');
    }
  }
  return { takeImageHandler };
};

export default useCamera;
