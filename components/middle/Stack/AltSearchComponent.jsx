import { Text, View, Pressable, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CircleSearch, UserSearch, MapSearch } from '../../../screens';
import { styles } from '../../../screens/FriendsList/styles';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../../api/userApi';
import {  fetchPublicCircle } from '../../../api/circleApi';
import { tabState } from '../../../stores/tab-store';
import { useRecoilValue } from 'recoil';

const Tab = createBottomTabNavigator();

const AltSearchComponent = () => {
  const [searchText, setSearchText] = useState(''); // 검색한 데이터
  const [filtered, setFiltered] = useState([]); //검색해서 필터링 된 데이터
  const routeName = useRecoilValue(tabState);

  const { data: users, isLoading: isLoading1 } = useQuery({
    queryKey: ['user', 'search'],
    queryFn: () => fetchAllUsers(),
  });

  const { data: circles, isLoading: isLoading2} = useQuery({
    queryKey: ['circle', 'search'],
    queryFn: () => fetchPublicCircle(),
  });

  const { data: maps, isLoading: isLoading3 } = useQuery({
    queryKey: ['allPhotos'],
    queryFn: () => fetchAllPhotos(17),
    refetchWindowFocus: true,
    staleTime: 1000 * 60 
  });

  // // 필터링 함수 
  const handleFilter = (searchText) => {
    setSearchText(searchText);
    let myList=[];
    if(routeName === '유저'){
      myList = users.filter((item) => {
        return item.nickname?.toUpperCase().includes(searchText.toUpperCase()); 
      });
    }else if(routeName === '써클'){
      myList = circles.filter((item) => {
        return item.name?.toUpperCase().includes(searchText.toUpperCase()); 
      });

    }else {
      // myList = maps.filter((item) => {
      //   return item.nickname?.toUpperCase().includes(searchText.toUpperCase()); 
      // });
    }
    setFiltered(myList);
  };

  const clearSearch = () => {
    setFiltered([]);
    setSearchText('');
  };

  const searchPress = () => {
    if(searchText.trim() === ''){
      alert('검색어가 입력되지 않았습니다.');
      return;
    };
    handleFilter(searchText);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.searchBarWrapper, { marginLeft: 'auto', marginRight: 'auto', marginBottom: 8 }]}>
        <Ionicons name="search-sharp" size={17} color="black" style={styles.searchIcon} />
        <TextInput 
        keyboardType='web-search' 
        style={styles.searchBar} 
        placeholder="검색"
        value={searchText} 
        onChangeText={handleFilter} 
        returnKeyType='search' 
        onSubmitEditing={searchPress}
        />
      {searchText.length > 0 && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <Ionicons name="close" size={17} color="#78716C" />
          </Pressable>
        )}
      </View>
      <Tab.Navigator
        initialRouteName="User"
        screenOptions={({ route }) => ({
          // tabBarOptions: (props) => <Middle {...props} /> ,
          safeAreaInsets: { bottom: 'never' },
          headerShown: false,
          tabBarIcon: () => null,
          tabBarLabel: route.name,
          tabBarActiveBackgroundColor: '#FFE3E0',
          tabBarLabelStyle: {
            color: '#44403C',
            fontSize: 15,
            fontFamily: 'IropkeBatang',
            marginBottom: 9.5,
          },
          tabBarIndicatorStyle: {
            display: 'none',
          },
          tabBarStyle: {
            position: 'absolute',
            top: 0,
            zIndex: 1,
            height: 42,
            elevation: 0, // Add this line to remove shadow on Android
          },
        })}>
        <Tab.Screen
          name="유저"
          options={{
            tabBarItemStyle: {
              height: 42,
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderColor: '#44403C',
            },
          }}
        >
          {(props) => <UserSearch {...props} filtered={filtered} />}
        </Tab.Screen>
        <Tab.Screen
          name="써클"
          options={{
            tabBarItemStyle: {
              height: 42,
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderLeftWidth: 0.5,
              borderColor: '#44403C',
            },
          }}
        >
          {(props) => <CircleSearch {...props} filtered={filtered} data={circles}/>}
        </Tab.Screen>
        <Tab.Screen
          name="지도"
          options={{
            tabBarItemStyle: {
              height: 42,
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderLeftWidth: 0.5,
              borderColor: '#44403C',
            },
          }}
        >
          {(props) => <MapSearch {...props} filtered={filtered} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default AltSearchComponent;
