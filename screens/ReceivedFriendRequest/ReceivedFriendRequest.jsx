import React, { useLayoutEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import { PersonRow } from '../../components';

const ReceivedFriendRequest = () => {
  // 버튼 객체를 별도로 분리
  const receiveButton = {
    icon: require('../../assets/icons/add.png'),
    style: { width: 10, height: 10 },
    onPress: () => {},
  };

  const userList = useMemo(
    () => [
      {
        user: {
          profileImage: '',
          username: '도라에몽',
          introduction: '파란색 고양이',
        },
        button: receiveButton,
      },
      {
        user: {
          profileImage: '',
          username: '김씨네',
          introduction: '삼계탕 맛있어요',
        },
        button: receiveButton,
      },
    ],
    [],
  );

  const renderItem = ({ item, index }) => (
    <PersonRow key={index} profileImage={item.profileImage} user={item.user} button={item.button} />
  );

  return (
    <FlatList
      style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}
      data={userList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ReceivedFriendRequest;
