import React, { useEffect, useState } from 'react'; // useState 추가
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { useFonts } from 'expo-font';

// import { MyPage } from '../screens/MyPage'; // MyPage 추가
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TimeLine, Search, MyPage } from '../screens';
// import Search_Icon from '../assets/icons/search-logo.svg';
// import Profile_Icon from '../assets/icons/default-profile.svg';
// import TimeLine_Icon from '../assets/icons/timeline-logo.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const UpperTab = () => {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if(route.name === 'Search'){
            // image = require('../assets/icons/search-logo.svg');
            // return <Image source={Search_Icon} style={{width:20, height:20}}/>
            iconName = 'search'
          }
          else if(route.name === 'MyPage'){
            // image = require('../assets/icons/default-profile.svg');
            // return <Image source={Profile_Icon} style={{width:20, height:20}}/>
            iconName = 'user-circle'
          }
          else if(route.name === 'TimeLine'){
            // image = require('../assets/icons/timeline-logo.svg');
            // return <Image source={TimeLine_Icon} style={{width:20, height:20}}/>
            iconName = 'globe'
          }
          return(
            <FontAwesome name={iconName} size={24} color={'black'} />
          )
        }
      })}
    >
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="TimeLine" component={TimeLine} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    IropkeBatang: require('../assets/fonts/IropkeBatangM.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <View style={styles.container}>
        <UpperTab />
      /* <SafeAreaView>
        <MyPage />
        <NavigationContainer>
          <Stacks.Navigator initialRouteName="MyPage">
            <Stack.Screen name="MyPage" componenet={MyPage}/>
            <Stack.Screen name="Search" mponenet={Search}/>
            <Stack.Screen name="TimeLine" componenet={TimeLine}/>
          </Stacks.Navigator>
        </NavigationContainer>
      </SafeAreaView> 
    </View>*/
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'IropkeBatang',
    fontSize: 15,
  },
});

