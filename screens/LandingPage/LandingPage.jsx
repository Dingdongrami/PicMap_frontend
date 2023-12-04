import { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from '@react-navigation/native';

const LandingPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  // 모달을 닫는 함수
  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('MyPage');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <Modal transparent={true} visible={modalVisible} onRequestClose={closeModal} animationType="fade">
      <Pressable style={styles.container} onPress={() => {}}>
        <Text style={styles.LogoText}>PicMap</Text>
        <Pressable style={styles.textWrapper}>
          <Text style={styles.text}>Sign in</Text>
        </Pressable>
        <Pressable style={styles.textWrapper}>
          <Text style={styles.text}>Sign up</Text>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCFCF2',
  },
  LogoText: {
    fontSize: 28,
    fontFamily: 'IropkeBatang',
    color: '#44403C',
    letterSpacing: 2.8,
    marginBottom: 144,
  },
  textWrapper: {
    height: 23.5,
    borderBottomColor: '#44403C',
    borderBottomWidth: 0.5,
    marginBottom: 30,
  },
  text: {
    fontSize: 15,
    fontFamily: 'IropkeBatang',
    color: '#44403C',
    letterSpacing: 1.5,
  },
});
