import { View, Text, Pressable } from 'react-native'; // Import Pressable
import { styles } from './styles';
import { styles as modalStyles } from '../Modal/styles';
import { styles as buttonStyles } from '../../screens/Profile/styles';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import { Image } from 'expo-image';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import CustomToast from '../CustomToast';
import { s3BaseUrl } from '../../constants/config';

export const CircleRoom = ({ circle }) => {
  const [filteredData, setFilteredData] = useState([]); // public: true
  const [isModalVisible, setModalVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigation = useNavigation();

  const isJoined = true; // TODO: Add logic to check if the user is a member of the circle.

  // Function to handle the modal toggle
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 사용자가 가입되지 않은 써클일 경우 모달을 띄우는 함수
  const onPressJoin = () => {
    // TODO: Add logic to check if the user is not a member of the circle.
    // If they're not a member, toggle the modal.
    // For now, we'll assume the user is not a member and just toggle the modal.
    toggleModal();
  };

  //각 써클로 접속하는 함수
  const enterCircle = () => {
    return navigation.navigate('SplashUI', { circleId: circle.id });
  };

  const joinCircle = () => {
    toggleModal();

    // TODO: 가입 로직을 여기에 추가하세요.

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
          {circle.image ? (
            <Image style={modalStyles.circleImage} source={circle.image} />
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
      <Pressable style={styles.circleRoom} onPress={isJoined ? enterCircle : onPressJoin}>
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
