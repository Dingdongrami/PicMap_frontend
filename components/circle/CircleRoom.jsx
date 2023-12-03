import { View, Text, Pressable } from 'react-native'; // Import Pressable
import { styles } from './styles';
import { styles as modalStyles } from '../Modal/styles';
import { styles as buttonStyles } from '../../screens/Profile/styles';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import CustomToast from '../CustomToast';
import { s3BaseUrl } from '../../constants/config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCircle, joinPublicCircle } from '../../api/circleApi';

export const CircleRoom = ({ circle, notMyPublicCircleData }) => {
  const [filteredData, setFilteredData] = useState([]); // public: true
  const [isModalVisible, setModalVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigation = useNavigation();

  const queryClient = useQueryClient();
  const myCircleData = useQuery({
    queryKey: ['circle'],
    queryFn: () => fetchCircle(17),
  });

  const joinMutation = useMutation({
    mutationFn: args => joinPublicCircle(args.userId, args.circleId),
    onSuccess: () => {
      console.log('joinMutation success');
      queryClient.invalidateQueries('circle');
    },
  });

  // Function to handle the modal toggle
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 사용자가 가입되지 않은 써클일 경우 모달을 띄우는 함수
  const onPressJoin = () => {
    toggleModal();
  };

  //각 써클로 접속하는 함수
  const enterCircle = () => {
    return navigation.navigate('SplashUI', { circleId: circle.id });
  };

  const handleCircleRoomClick = circleId => {
    let isJoined = myCircleData.data.some(circle => circle.id === circleId);
    if (isJoined) {
      enterCircle();
    } else {
      onPressJoin();
    }
  };

  const joinCircle = () => {
    toggleModal();

    // TODO: 가입 로직을 여기에 추가하세요.
    joinMutation.mutate({ userId: 17, circleId: circle.id });

    // 가입 로직이 성공했다고 가정하고 토스트 메시지를 띄웁니다.
    setToastMessage('가입 성공');
    setShowToast(true);
  };

  // console.log(s3Url + circle.thumbnail);

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        style={modalStyles.modal}
        onSwipeComplete={toggleModal}
        swipeDirection={'down'}
        onBackdropPress={toggleModal}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalLine} />
          {circle.thumbnail ? (
            <Image style={modalStyles.circleImage} source={s3BaseUrl + circle.thumbnail} />
          ) : (
            <View style={modalStyles.circleNoImageWrapper}>
              <Image style={modalStyles.circleNoImage} source={require('../../assets/icons/image.png')} />
            </View>
          )}
          <View style={modalStyles.circleInfoContainer}>
            <Text style={modalStyles.circleName}>{circle.name}</Text>
            <Text style={modalStyles.circleDescription}>{circle.description}</Text>
            <Pressable style={[buttonStyles.saveButton, { marginTop: 27 }]} onPress={joinCircle}>
              <Text style={buttonStyles.label}>가입</Text>
            </Pressable>
            <Pressable style={[buttonStyles.cancelButton, { marginBottom: 10 }]} onPress={toggleModal}>
              <Text style={buttonStyles.label}>취소</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Wrap the circleRoom in a Pressable to detect touches */}
      <Pressable style={styles.circleRoom} onPress={() => handleCircleRoomClick(circle.id)}>
        {circle.thumbnail ? (
          <Image style={styles.circlePhoto} source={s3BaseUrl + circle.thumbnail} ContentFit="cover" />
        ) : (
          <View style={styles.noImageWrapper}>
            <Image style={styles.noImage} source={require('../../assets/icons/image.png')} />
          </View>
        )}
        <View style={styles.circleName}>
          <Text style={styles.circleNameText}>{circle.name}</Text>
        </View>
      </Pressable>
      <CustomToast text={toastMessage} show={showToast} />
    </>
  );
};
