import { Post, Circle, Map } from '../../../screens/MyPage';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyProfile } from '../../MyProfile';

const Tab = createBottomTabNavigator();

const Label = ({ label }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#44403C' }}>{label}</Text>
    </View>
  );
};

const AltComponent = ({ navigation }) => {
  const onPressEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  const onPressFriendsList = () => {
    navigation.navigate('FriendsList');
  };

  return (
    <View style={{ flex: 1 }}>
      <MyProfile onPressEditProfile={onPressEditProfile} onPressFriendsList={onPressFriendsList} />
      <Tab.Navigator
        initialRouteName="Post"
        screenOptions={({ route }) => ({
          // tabBarOptions: (props) => <Middle {...props} /> ,
          safeAreaInsets: { bottom: 'never' }, // 여기에 이 속성을 추가하세요
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
          name="Post"
          component={Post}
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
          name="Map"
          component={Map}
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
        <Tab.Screen
          name="Circle"
          component={Circle}
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

export default AltComponent;
