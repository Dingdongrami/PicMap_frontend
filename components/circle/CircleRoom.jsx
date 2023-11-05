import { View, Text, Pressable } from 'react-native'; // Import Pressable
import { styles } from './styles';
import { styles as modalStyles } from '../Modal/styles';
import { styles as buttonStyles } from '../../screens/Profile/styles';
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { Image } from 'expo-image';
import Toast from 'react-native-root-toast';
import { data } from '../../data/circle-dummy';

export const CircleRoom = ({ item }) => {
  const [filteredData, setFilteredData] = useState([]); // public: true
  const [isModalVisible, setModalVisible] = useState(false);

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

  const joinCircle = () => {
    toggleModal();

    // TODO: 가입 로직을 여기에 추가하세요.
    /* data.forEach(circle => {
      if (circle.id === item.id) {
        circle.join = true;
      }
    }); */

    // 가입 로직이 성공했다고 가정하고 토스트 메시지를 띄웁니다.
    Toast.show('가입 성공', {
      duration: Toast.durations.SHORT,
      position: -60,
      animation: true,
      delay: 0,
      backgroundColor: 'rgba(255, 236, 234, 0.80)',
      textColor: '#44403C',
      textStyle: { fontFamily: 'IropkeBatang', fontSize: 15 },
      containerStyle: {
        paddingVertical: 13,
        width: 312,
        borderRadius: 10,
      },
      shadow: false,
    });
  };

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
          {item?.image ? (
            <Image style={modalStyles.circleImage} />
          ) : (
            <View style={modalStyles.circleNoImageWrapper}>
              <Image style={modalStyles.circleNoImage} source={require('../../assets/icons/image.png')} />
            </View>
          )}
          <View style={modalStyles.circleInfoContainer}>
            <Text style={modalStyles.circleName}>{item.name}</Text>
            <Text style={modalStyles.circleDescription}>{item.description}</Text>
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
      <Pressable style={styles.circleRoom} onPress={!item.join ? onPressJoin : null}>
        {item.image ? (
          <Image style={styles.circlePhoto} source={item.Image} />
        ) : (
          <View style={styles.noImageWrapper}>
            <Image style={styles.noImage} source={require('../../assets/icons/image.png')} />
          </View>
        )}
        <View style={styles.circleName}>
          <Text style={styles.circleNameText}>{item.name}</Text>
        </View>
      </Pressable>
    </>
  );
};
