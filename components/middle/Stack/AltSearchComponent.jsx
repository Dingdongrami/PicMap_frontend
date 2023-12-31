import { Text, View, Pressable, TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CircleSearch, UserSearch, MapSearch } from '../../../screens';
import { styles } from '../../../screens/FriendsList/styles';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../../api/userApi';
import { fetchPublicCircle } from '../../../api/circleApi';
import { tabState } from '../../../stores/tab-store';
import { useRecoilValue } from 'recoil';
import { searchLocations } from '../../../api/searchApi';
import { allPublicPhotos } from '../../../api/mapphotoApi';

const Tab = createBottomTabNavigator();

const AltSearchComponent = () => {
  const [searchText, setSearchText] = useState(''); // 검색한 데이터
  const [filtered, setFiltered] = useState([]); //검색해서 필터링 된 데이터
  const routeName = useRecoilValue(tabState);

  const { data: users, isLoading: isLoading1 } = useQuery({
    queryKey: ['user', 'search'],
    queryFn: () => fetchAllUsers(),
  });

  const { data: circles, isLoading: isLoading2 } = useQuery({
    queryKey: ['circle', 'search'],
    queryFn: () => fetchPublicCircle(),
  });

  // // 필터링 함수
  const handleFilter = async searchText => {
    setSearchText(searchText);
    let myList = [];
    if (routeName === '유저') {
      myList = users.filter(item => {
        return item.nickname?.toUpperCase().includes(searchText.toUpperCase());
      });
      setFiltered(myList);
    } else if (routeName === '써클') {
      myList = circles.filter(item => {
        return item.name?.toUpperCase().includes(searchText.toUpperCase());
      });
      setFiltered(myList);
    }
  };

  const clearSearch = () => {
    setFiltered([]);
    setSearchText('');
  };

  const searchPress = async () => {
    if (searchText.trim() === '') {
      Alert.alert('알림', '검색어가 입력되지 않았습니다.');
      return;
    }

    if (routeName === '지도') {
      try {
        const result = await searchLocations(searchText);
        setFiltered(result);

        // '지도' 탭에서 검색 결과가 없는 경우 알림을 표시합니다.
        if (result?.length === 0) {
          Alert.alert('알림', '검색 결과가 없습니다.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('알림', '검색 중 오류가 발생했습니다.');
      }
    } else {
      handleFilter(searchText);
    }
  };

  useEffect(() => {
    // routeName이 변경될 때마다 filtered를 초기화합니다.
    setFiltered([]);
    setSearchText('');
  }, [routeName]); // routeName이 변경될 때만 이 effect가 실행됩니다.

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.searchBarWrapper, { marginLeft: 'auto', marginRight: 'auto', marginBottom: 8 }]}>
        <Ionicons name="search-sharp" size={17} color="black" style={styles.searchIcon} />
        <TextInput
          keyboardType="web-search"
          style={styles.searchBar}
          placeholder="검색"
          value={searchText}
          onChangeText={handleFilter}
          returnKeyType="search"
          onSubmitEditing={searchPress}
        />
        {searchText?.length > 0 && (
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
          }}>
          {props => <UserSearch {...props} filtered={filtered} />}
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
          }}>
          {props => <CircleSearch {...props} filtered={filtered} data={circles} />}
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
          }}>
          {props => <MapSearch {...props} filtered={filtered} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default AltSearchComponent;
