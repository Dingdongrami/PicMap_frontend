import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { PersonRow } from '../../components';
import { styles } from './styles';

const FriendsAdd = () => {
  // 버튼 객체를 별도로 분리
  const personAddButton = {
    icon: require('../../assets/icons/person_add.png'),
    style: styles.personAddIcon,
    onPress: () => {},
  };

  const userList = [
    {
      user: {
        profileImage: '',
        username: '이지민',
        introduction: '안녕하세요',
      },
      button: personAddButton,
    },
    {
      user: {
        profileImage: '',
        username: '공소연',
        introduction: '반가워요',
      },
      button: personAddButton,
    },
    {
      user: {
        profileImage: '',
        username: '김민정',
        introduction: '안녕하세용',
      },
      button: personAddButton,
    },
  ];

  const renderItem = ({ item, index }) => (
    <PersonRow key={index} profileImage={item.profileImage} user={item.user} button={item.button} />
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%', marginTop: 9 }}
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FriendsAdd;