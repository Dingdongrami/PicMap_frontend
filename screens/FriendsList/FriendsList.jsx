import { Image } from 'expo-image';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { PersonRow } from '../../components';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CircleDetailHeader from '../../components/header/CircleDetailHeader';
import { BottomModal } from '../../components/Modal';
import { fetchFriends } from '../../api/friendsApi';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../api/userApi';

// FriendItem 컴포넌트
const FriendItem = ({ requesterId, isRemoveActive, removeButton }) => {
  const { data: user } = useQuery({
    queryKey: ['friendItem', requesterId],
    queryFn: () => fetchUser(requesterId),
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return <PersonRow user={user} button={isRemoveActive ? removeButton : null} />;
};

// FriendsList 컴포넌트
const FriendsList = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRemoveActive, setIsRemoveActive] = useState(false);
  const { data: friendsList } = useQuery({
    queryKey: ['friendsList', 17],
    queryFn: () => fetchFriends(17),
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const toggleModal = () => {
    setIsModalVisible(prev => !prev);
  };

  const toggleRemove = () => {
    setIsRemoveActive(true);
    setIsModalVisible(false);
  };

  const navigateToReceived = () => {
    navigation.navigate('ReceivedFriendRequest');
    setIsModalVisible(false);
  };

  // 버튼 객체를 별도로 분리
  const removeButton = {
    icon: require('../../assets/icons/remove.png'),
    style: styles.removeIcon,
    onPress: () => {},
  };

  const buttons = useMemo(
    () => [
      {
        text: '받은 친구 요청',
        icon: require('../../assets/icons/person_add.png'),
        iconStyle: styles.modalIcon,
        onPress: navigateToReceived,
      },
      {
        text: '친구 삭제',
        icon: require('../../assets/icons/person_remove.png'),
        iconStyle: styles.modalIcon,
        textStyle: { color: '#E53A40' },
        onPress: toggleRemove,
      },
      {
        text: '닫기',
        icon: require('../../assets/icons/exit_icon.png'),
        iconStyle: styles.modalIcon,
        onPress: toggleModal,
      },
    ],
    [],
  );

  const clearSearch = () => {
    setSearchText('');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CircleDetailHeader onPress={toggleModal} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarWrapper}>
        <Ionicons name="search-sharp" size={17} color="black" style={styles.searchIcon} />
        <TextInput style={styles.searchBar} placeholder="검색" value={searchText} onChangeText={setSearchText} />
        {searchText.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close" size={17} color="#78716C" />
          </Pressable>
        )}
      </View>
      <FlatList
        style={{ width: '100%' }}
        data={friendsList}
        renderItem={({ item }) => (
          <FriendItem requesterId={item?.requesterId} isRemoveActive={isRemoveActive} removeButton={removeButton} />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={buttons} />
    </View>
  );
};

export default FriendsList;
