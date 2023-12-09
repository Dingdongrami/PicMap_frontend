import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { PersonRow } from '../../components';
import { styles } from './styles';
import { fetchAllUsers } from '../../api/userApi';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { tabState } from '../../stores/tab-store';
import { useIsFocused } from '@react-navigation/native';

const UserSearch = ({filtered, route, isLoading,}) => {
  const [myList, setMyList] = useState([]);
  const [routeName, setRouteName] = useRecoilState(tabState);
  const isFocused = useIsFocused();

  const { data } = useQuery({
    queryKey: ['user', 'search'],
    queryFn: () => fetchAllUsers(),
  });

  useEffect(() => {
    if(filtered != 0){
      setMyList(filtered);
    }else{
      setMyList(data);
    }
  }, [filtered]);

  useEffect(()=>{
    if(isFocused)
      setRouteName(route.name);
  },[isFocused]);

  const renderItem = ({ item, index }) => (
    <PersonRow key={index} profileImage={item.profileImage} user={item} button={item.button} />
  );

  // if(isLoading){
  //   return(
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#D0C8c8"/>
  //     </View>
  //   )
  // }else 
  if(data) {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%', marginTop: 9 }}
          data={myList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );  
  }
};

export default UserSearch;
