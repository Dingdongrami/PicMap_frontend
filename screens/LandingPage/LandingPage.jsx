import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Text } from 'react-native';

const LandingPage = ({ navigation }) => {
  // 2초 뒤 마이페이지로 이동
  useEffect(() => {
    // setTimeout(() => {
    //   navigation.navigate('MyPage');
    // }, 5000);

    return () => {
      clearTimeout();
    };
  }, []);
  return (
    <Pressable onPress={() => navigation.navigate('MyPage')} style={styles.container}>
      <Text style={styles.LogoText}>PicMap</Text>
      <Pressable style={styles.textWrapper}>
        <Text style={styles.text}>Sign in</Text>
      </Pressable>
      <Pressable style={styles.textWrapper}>
        <Text style={styles.text}>Sign up</Text>
      </Pressable>
    </Pressable>
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
