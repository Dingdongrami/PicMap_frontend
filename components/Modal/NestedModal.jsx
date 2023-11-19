import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import Modal from 'react-native-modal';
// import { ModalPresenterParent, showModal } from '@whitespectre/rn-modal-presenter';
import { useState } from 'react';

export const NestedModal = ({ isModalVisible, toggleModal, buttons }) => {
  // const textValue = buttons[0].text;
  // console.log(textValue);
  const [ isClicked, setIsClicked ] = useState(false);
  const customPress = (button) => {
    button.onPress;
    setIsClicked(!isClicked);
  }

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modal}
      onSwipeComplete={toggleModal}
      swipeDirection={'down'}
      onBackdropPress={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalLine} />
        <View style={styles.modalButtonContainer}>
          {buttons.map((button, index) => (
            <Pressable key={index} style={styles.modalButton} onPress={button.onPress}>
              <Image source={button.icon} style={button.iconStyle} resizeMode="contain" />
              <Text style={[styles.modalText, button.textStyle]}>{button.text}</Text>
            </Pressable>
          ))}
        </View> 
      </View>
    </Modal>
  );
};
