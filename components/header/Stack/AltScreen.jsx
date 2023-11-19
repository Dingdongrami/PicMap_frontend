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
} from '../../../screens';
import { Header } from '../Header';
import { CircleHeader } from '../CircleHeader';
import AltComponent from '../../middle/Stack/AltComponent';
import { SplashUI } from '../../../screens/MyPage/Circle/SplashUI';
import { SingleCircle } from '../../../screens/MyPage/Circle/SingleCircle';
import { ZoomInMap } from '../../circle/single/ZoomInMap';
import { CircleDetailHeader } from '../CircleDetailHeader';
import AltUserComponent from '../../middle/Stack/AltUserComponent';
import { PhotoCom } from '../../../screens/MyPage/Circle/PhotoCom';
import { JustGoBackHeader } from '../JustGoBackHeader';
import { BottomModal } from '../../Modal/Modal';
import { NestedModal } from '../../Modal/NestedModal';
import AltSearchComponent from '../../middle/Stack/AltSearchComponent';

const Stack = createNativeStackNavigator();

export const AltScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={({ navigation }) => ({
        header: props => <Header {...props} />,
        headerStatusBarHeight: 0,
      })}>
      <Stack.Group>
        <Stack.Screen name="MyPage" component={AltComponent} />
        <Stack.Screen name="Search" component={AltSearchComponent} />
        <Stack.Screen name="TimeLine" component={TimeLine} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditUsername" component={EditUsername} />
        <Stack.Screen name="EditIntroduction" component={EditIntroduction} />
        <Stack.Screen name="CircleCreate" component={CircleCreate} />
        <Stack.Screen name="CircleCreateName" component={CircleCreateName} />
        <Stack.Screen name="CircleCreateDesc" component={CircleCreateDesc} />
        <Stack.Screen name="FriendsList" component={FriendsList} />
      </Stack.Group>
      <Stack.Group
      screenOptions={{ header: () => <JustGoBackHeader />, 
      headerTitle: 'JustGoBackHeader' }}>
        <Stack.Screen name="UserPage" component={AltUserComponent} />
        <Stack.Screen name="ReceivedFriendRequest" component={ReceivedFriendRequest} />
      </Stack.Group>
      <Stack.Group
      screenOptions={{ header: () => <CircleHeader />, 
      headerTitle: 'CircleHeader' }}>
        <Stack.Screen name="SingleCircle" component={SingleCircle} />
      </Stack.Group>
      <Stack.Group 
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashUI" component={SplashUI}  />  
      </Stack.Group>
      <Stack.Group
      screenOptions={{ header: () => <CircleDetailHeader />, 
      headerTitle: 'CircleDetailHeader' }}>
        <Stack.Screen name="ZoomInMap" component={ZoomInMap} />
        <Stack.Screen name="PhotoCom" component={PhotoCom} />
      </Stack.Group>
      <Stack.Group
      screenOptions={{ presentation: 'modal' }} >
        <Stack.Screen name="BottomModal" component={BottomModal} />
        <Stack.Screen name="NestedModal" component={NestedModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
