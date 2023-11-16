import { Text, View, Pressable, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CircleSearch, UserSearch } from '../../../screens';
import { styles } from '../../../screens/FriendsList/styles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

const AltSearchComponent = ({ route }) => {
  const [searchText, setSearchText] = useState('');
  const onPressFriendRequest = () => {};

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.searchBarWrapper, { marginLeft: 'auto', marginRight: 'auto', marginBottom: 8 }]}>
        <Ionicons name="search-sharp" size={17} color="black" style={styles.searchIcon} />
        <TextInput style={styles.searchBar} placeholder="검색" value={searchText} onChangeText={setSearchText} />
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
            marginBottom: 9,
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
          name="User"
          component={UserSearch}
          options={{
            tabBarItemStyle: {
              height: 42,
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderColor: '#44403C',
            },
          }}
        />
        <Tab.Screen
          name="Circle"
          component={CircleSearch}
          options={{
            tabBarItemStyle: {
              height: 42,
              borderBottomWidth: 0.5,
              borderTopWidth: 0.5,
              borderLeftWidth: 0.5,
              borderColor: '#44403C',
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AltSearchComponent;
