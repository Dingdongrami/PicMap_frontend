import { Post, Map } from '../../../screens/UserPage';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../UserProfile/UserProfile';

const Tab = createBottomTabNavigator();

const AltUserComponent = ({ route }) => {
  const onPressFriendRequest = () => {};

  const user = route.params.user;

  return (
    <View style={{ flex: 1 }}>
      <UserProfile onPressFriendRequest={onPressFriendRequest} user={user} />
      <Tab.Navigator
        initialRouteName="Post"
        screenOptions={({ route }) => ({
          // tabBarOptions: (props) => <Middle {...props} /> ,
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
      </Tab.Navigator>
    </View>
  );
};

export default AltUserComponent;
