import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  EditIntroduction,
  EditProfile,
  EditUsername,
  FriendsList,
  TimeLine,
  CircleCreate,
  CircleCreateDesc,
  CircleCreateName,
  ReceivedFriendRequest,
  InviteUser,
  SplashUI,
  SingleCircle,
  PhotoCom,
  LandingPage,
} from '../../../screens';
import Header from '../Header';
import CircleHeader from '../CircleHeader';
import CircleDetailHeader from '../CircleDetailHeader';
import JustGoBackHeader from '../JustGoBackHeader';
import { ZoomInMap } from '../../circle';
import { AltComponent, AltUserComponent, AltSearchComponent } from '../../middle';
import { MapList } from '../../MapMarker/MapList';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const AltScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="LandingPage"
      safeAreaInsets={{ top: 0, bottom: 0 }}
      screenOptions={({ navigation }) => ({
        header: props => <Header {...props} />,
        // headerStatusBarHeight: 0,
      })}>
      <Stack.Group>
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
        <Stack.Screen name="MyPage" component={AltComponent} />
        <Stack.Screen name="MapList" component={MapList} />
        <Stack.Screen name="Search" component={AltSearchComponent} />
        <Stack.Screen name="TimeLine" component={TimeLine} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditUsername" component={EditUsername} />
        <Stack.Screen name="EditIntroduction" component={EditIntroduction} />
        <Stack.Screen name="CircleCreate" component={CircleCreate} />
        <Stack.Screen name="CircleCreateName" component={CircleCreateName} />
        <Stack.Screen name="CircleCreateDesc" component={CircleCreateDesc} />
        <Stack.Screen name="FriendsList" component={FriendsList} />
        <Stack.Screen name="SingleCircle" component={SingleCircle} />
      </Stack.Group>
      <Stack.Group screenOptions={{ header: () => <JustGoBackHeader />, headerTitle: 'JustGoBackHeader' }}>
        <Stack.Screen name="UserPage" component={AltUserComponent} />
        <Stack.Screen name="ReceivedFriendRequest" component={ReceivedFriendRequest} />
        <Stack.Screen name="InviteUser" component={InviteUser} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashUI" component={SplashUI} />
      </Stack.Group>
      <Stack.Group screenOptions={{ header: () => <CircleDetailHeader />, headerTitle: 'CircleDetailHeader' }}>
        <Stack.Screen name="ZoomInMap" component={ZoomInMap} />
        <Stack.Screen name="PhotoCom" component={PhotoCom} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AltScreen;
