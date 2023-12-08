import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { PersonRow } from '../../components';
import { styles } from './styles';
import { useQuery } from '@tanstack/react-query';

const InviteUser = () => {
  const { data: friendsList } = useQuery({
    queryKey: ['friendsList', 17],
    queryFn: () => fetchFriends(17),
    // refetchOnWindowFocus: true,
  });

  // 버튼 객체를 별도로 분리
  const personAddButton = {
    icon: require('../../assets/icons/person_add.png'),
    style: styles.personAddIcon,
    onPress: () => {},
  };

  console.log(friendsList);

  const renderItem = ({ item, index }) => <PersonRow key={item?.requesterId} user={item} button={personAddButton} />;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <FlatList
        style={{ width: '100%', marginTop: 9 }}
        data={friendsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default InviteUser;
