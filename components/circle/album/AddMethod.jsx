import { View, Pressable, StyleSheet, Image, Animated, Linking, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { selectState } from '../../../stores/circle-selection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPhoto, uploadShootingPhoto } from '../../../api/photoApi';
import { useNavigation } from '@react-navigation/core';
import useCamera from '../../../hooks/useCamera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export const AddMethod = ({ onPress, expansion, circleId }) => {
  const [selection] = useRecoilState(selectState);
  const imageStyles = [styles.overlay];
  const { navigate } = useNavigation();
  const queryClient = useQueryClient();
  const { takeImageHandler } = useCamera(onImageCaptured);
  const mediaLibraryMutation = useMutation({
    mutationFn: args => uploadPhoto(args.photoUri, args.circleId),
    onSuccess: data => {
      queryClient.invalidateQueries('photo');
    },
  });
  const cameraMutation = useMutation({
    mutationFn: args => uploadShootingPhoto(args.photoUri, args.circleId, args.location),
    onSuccess: data => {
      queryClient.invalidateQueries('photo');
    },
  });
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

  // const navigateToCamera = async () => {
  //   const hasPermission = await getLocationPermission();
  //   if (!hasPermission) {
  //     return;
  //   }
  //   navigate('CameraScreen', { circleId });
  // };

  async function loadPhotos() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await MediaLibrary.getAssetsAsync({
      mediaType: 'photo',
      first: 10, // 첫 10개의 사진 가져오기
    });

    const photos = result.assets;
    console.log(
      photos.forEach(photo => {
        if (photo.location) {
          console.log(`Photo location: Latitude ${photo.location.latitude}, Longitude ${photo.location.longitude}`);
        }
      }),
    );
  }

  async function onImageCaptured(uri) {
    const permission = getLocationPermission();
    if (!permission) {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    cameraMutation.mutate({ photoUri: uri, circleId, location });
  }

  if (expansion) {
    const animation = new Animated.Value(expansion ? 0 : 1);

    Animated.timing(animation, {
      toValue: expansion ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    const rotateInterPolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });
    const animatedStyles = { transform: [{ rotate: rotateInterPolate }] };
    imageStyles.push(animatedStyles);
  }

  return (
    !selection && (
      <Pressable onPress={onPress}>
        {expansion ? (
          <View style={styles.addition}>
            <Pressable onPress={loadPhotos}>
              <Image source={require('../../../assets/icons/album_add.png')} contentFit="cover" style={styles.icon1} />
            </Pressable>
            <Pressable onPress={takeImageHandler}>
              <Image source={require('../../../assets/icons/camera_add.png')} contentFit="cover" style={styles.icon2} />
            </Pressable>
          </View>
        ) : undefined}
        <Animated.View style={imageStyles}>
          <Image source={require('../../../assets/icons/function_add_btn.png')} style={styles.imageStyle} />
        </Animated.View>
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 23,
    bottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imageStyle: {
    width: 55,
    height: 55,
  },
  addition: {
    position: 'absolute',
    left: 23,
    bottom: 82,
    width: 61,
    height: 136,
    borderRadius: 30,
    backgroundColor: 'rgba(231, 229, 228, 0.80)',
    flexDirection: 'column',
    paddingTop: 27,
    alignItems: 'center',
    gap: 30,
  },
  icon1: {
    width: 30,
    height: 30,
  },
  icon2: {
    width: 30,
    height: 23,
  },
});
