import { Post, Map } from '../../../screens/UserPage';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../UserProfile/UserProfile';
import { Image } from 'expo-image';

const Tab = createBottomTabNavigator();

const AltUserComponent = ({ route }) => {
  const onPressFriendRequest = () => {};

  const user = route.params.user;

  return (
    <View style={{ flex: 1 }}>
      <UserProfile onPressFriendRequest={onPressFriendRequest} user={user} />
      {user.status === 'PRIVATE' && user.id != 17 ? (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 100,
            // backgroundColor: '#FCFCF2',
          }}>
          <Image source={require('../../../assets/icons/private.png')} style={{ width: 15, height: 15 }} />
          <Text
            style={{
              fontFamily: 'IropkeBatang',
              fontSize: 16,
              marginLeft: 10,
              color: '#44403C',
            }}>
            비공개 계정입니다.
          </Text>
        </View>
      ) : (
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
            initialParams={{ user: user }}
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
            initialParams={{ user: user }}
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
      )}
    </View>
  );
};

export default AltUserComponent;
