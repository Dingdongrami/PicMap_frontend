import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { styles } from './styles';
import Modal from 'react-native-modal';
import { useState } from 'react';

export const NestedModal = ({ isModalVisible, toggleModal, buttons }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
            <Pressable
              key={index}
              onPress={() => {
                button.onPress();
                setSelectedIndex(index);
                toggleModal();
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, styles.modalButton]}>
              {index === selectedIndex && <Image source={button.icon} style={button.iconStyle} resizeMode="contain" />}
              <Text style={[styles.modalText, button.textStyle, { marginLeft: 78, position: 'absolute' }]}>
                {button.text}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};
