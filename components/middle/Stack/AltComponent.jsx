import { Post, Circle, Map } from '../../../screens/mycomponent';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Middle } from '../Middle';
import { CircleStack } from '../../circle/Stack/CircleStack';
import MyProfile from '../../MyProfile/MyProfile';

const Tab = createBottomTabNavigator();

const Label = ({ label }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#44403C' }}>{label}</Text>
    </View>
  );
};

export const AltComponent = ({ navigation }) => {
  const onPressEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  return (
    <View style={{ flex: 1 }}>
      <MyProfile onPress={onPressEditProfile} />
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
          component={CircleStack}
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
