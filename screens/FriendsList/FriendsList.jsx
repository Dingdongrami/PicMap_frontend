import { Image } from 'expo-image';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { PersonRow } from '../../components';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

const FriendsList = () => {
  const [searchText, setSearchText] = useState('');

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
    </View>
  );
};

export default FriendsList;
