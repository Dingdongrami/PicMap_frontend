import { Image, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import Modal from 'react-native-modal';

export const BottomModal = ({ isModalVisible, onToggleModal, buttons }) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modal}
      onSwipeComplete={onToggleModal}
      swipeDirection={'down'}
      onBackdropPress={onToggleModal}>
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
