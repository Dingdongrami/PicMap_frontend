import { Image } from 'expo-image';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { PersonRow } from '../../components';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CircleDetailHeader } from '../../components/header/CircleDetailHeader';
import { BottomModal } from '../../components/Modal/Modal';

const FriendsList = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const buttons = useMemo(
    () => [
      {
        text: '받은 친구 요청',
        icon: require('../../assets/icons/person_add.png'),
        iconStyle: styles.modalIcon,
        onPress: () => {},
      },
      {
        text: '친구 삭제',
        icon: require('../../assets/icons/person_remove.png'),
        iconStyle: styles.modalIcon,
        textStyle: { color: '#E53A40' },
        onPress: () => {},
      },
    ],
    [],
  );

  const userList = useMemo(
    () => [
      {
        profileImage: '',
        user: {
          username: '이지민',
          introduction: '안녕하세요',
        },
        button: {
          icon: '',
          onPress: () => {},
        },
      },
      {
        profileImage: '',
        user: {
          username: '공소연',
          introduction: '반가워요',
        },
        button: {
          icon: '',
          onPress: () => {},
        },
      },
      {
        profileImage: '',
        user: {
          username: '김민정',
          introduction: '안녕하세용',
        },
        button: {
          icon: '',
          onPress: () => {},
        },
      },
    ],
    [],
  );

  const renderItem = ({ item, index }) => (
    <PersonRow key={index} profileImage={item.profileImage} user={item.user} button={item.button} />
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
        data={userList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <BottomModal isModalVisible={isModalVisible} toggleModal={toggleModal} buttons={buttons} />
    </View>
  );
};

export default FriendsList;
