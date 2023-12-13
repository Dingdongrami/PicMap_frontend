import { View, Pressable, StyleSheet, Image, Animated, Linking, Alert } from 'react-native';
import { useRecoilState } from 'recoil';
import { circleSelectButtonState } from '../../../stores/circle-selection';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadPhotos, uploadShootingPhoto } from '../../../api/photoApi';
import { useCamera, useMediaLibrary, useLocation } from '../../../hooks';
import * as Location from 'expo-location';
import { useState } from 'react';
import { isPhotoUploadingState } from '../../../stores/circle-store';

export const AddMethod = ({ circleId }) => {
  const [isExpanded, setIsExpanded] = useState(null);
  const [isPhotoUploading, setIsPhotoUploading] = useRecoilState(isPhotoUploadingState);
  const [circleSelectButtonActive] = useRecoilState(circleSelectButtonState);
  const imageStyles = [styles.overlay];
  const queryClient = useQueryClient();

  const { selectImageHandler } = useMediaLibrary(onImageSelected, true);
  const { takeImageHandler } = useCamera(onImageCaptured);
  const { getLocationPermission } = useLocation();

  const mediaLibraryMutation = useMutation({
    mutationFn: args => uploadPhotos(args.photos, args.circleId),
    onSuccess: data => {
      setIsPhotoUploading(false);
      queryClient.invalidateQueries('photo');
    },
  });
  const cameraMutation = useMutation({
    mutationFn: args => uploadShootingPhoto(args.photoUri, args.circleId, args.location),
    onSuccess: data => {
      setIsPhotoUploading(false);
      queryClient.invalidateQueries('photo');
    },
  });

  // 호이스팅을 위해 함수 선언식으로 작성
  async function onImageSelected(photos) {
    setIsPhotoUploading(true);
    mediaLibraryMutation.mutate({ photos, circleId });
  }

  // 호이스팅을 위해 함수 선언식으로 작성
  async function onImageCaptured(photo) {
    setIsPhotoUploading(true);

    const permission = getLocationPermission();
    if (!permission) {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});

    // console.log('ImageCaptured', photo);
    cameraMutation.mutate({ photoUri: photo.uri, circleId, location });
  }

  if (isExpanded) {
    const animation = new Animated.Value(isExpanded ? 0 : 1);

    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
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
    !circleSelectButtonActive && (
      <Pressable onPress={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? (
          <View style={styles.addition}>
            <Pressable onPress={selectImageHandler}>
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
    bottom: 25,
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
    bottom: 110,
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
