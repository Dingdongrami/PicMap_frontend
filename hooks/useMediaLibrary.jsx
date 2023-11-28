import {
  useMediaLibraryPermissions,
  PermissionStatus,
  MediaTypeOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';

const useMediaLibrary = onImageCaptured => {
  const [imagePermissionInformation, requestImagePermission] = useMediaLibraryPermissions(); // 미디어 라이브러리 접근 권한

  async function verifyImagePermissions() {
    if (imagePermissionInformation.status !== PermissionStatus.GRANTED) {
      const permissionResponse = await requestImagePermission();
      return permissionResponse.granted;
    }

    if (imagePermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('미디어 라이브러리 권한이 필요합니다.', '설정에서 권한을 허용해주세요.', [
        { text: '취소', style: 'cancel' },
        { text: '설정으로 이동', onPress: () => Linking.openSettings() },
      ]);
      return false;
    }

    return true;
  }

  async function selectImageHandler() {
    try {
      const hasPermission = await verifyImagePermissions();

      if (!hasPermission) {
        return;
      }

      const image = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!image.canceled) {
        // 이미지가 취소되지 않았다면 실행할 코드
        onImageCaptured(image.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('미디어 라이브러리를 사용할 수 없습니다.', '다시 시도해주세요.');
      console.log(error);
    }
  }
  return { selectImageHandler };
};

export default useMediaLibrary;
