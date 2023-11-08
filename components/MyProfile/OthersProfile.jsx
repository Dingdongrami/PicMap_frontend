import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const OthersProfile = () => {
  //써클 참여자 더미데이터
  //여기서 써클 참여자라도 API 받아오는게 편리하지 않을까?
  const persons = [
    { id: 1, name: '김' },
    { id: 2, name: '이' },
    { id: 3, name: '박' },
    { id: 4, name: '최' },
    { id: 5, name: '양' },
    { id: 6, name: '우' },
    { id: 7, name: '행' },
    { id: 8, name: '허' },
    { id: 9, name: '장' },
  ];

  return(
    <>
    <ScrollView horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollBox}
    >
      {persons.map((item, index) => (
        <TouchableOpacity key={index} style={styles.personCircle}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </>  
  );
};

const styles = StyleSheet.create({
  scrollBox: {
    paddingHorizontal: 10
  },
  personCircle: {
    borderWidth: 0.5,
    borderColor: '#78716C',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'IropkeBatang',
    fontSize: 13,
    margin: 2
  },
})