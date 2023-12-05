import { Post, Circle, Map } from '../../../screens/MyPage';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyProfile from '../../MyProfile/MyProfile';

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
      <Tab.Navigator initialRouteName="Post" safeAreaInsets={{ top: 0, bottom: 0 }}>
        <Tab.Group
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
            name="사진"
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
            name="지도"
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
            name="써클"
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
        </Tab.Group>
      </Tab.Navigator>
    </View>
  );
};

export default AltComponent;
