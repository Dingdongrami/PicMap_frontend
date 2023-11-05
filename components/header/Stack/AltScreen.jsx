import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditIntroduction, EditProfile, EditUsername, Search, TimeLine } from '../../../screens';
import { Header } from '../Header';
import { AltComponent } from '../../middle/Stack/AltComponent';
import { CircleCreate } from '../../../screens/createCircle/CircleCreate';
import { CircleCreateName } from '../../../screens/createCircle/CircleCreateName';
import { CircleCreateDesc } from '../../../screens/createCircle/CircleCreateDesc';

const Stack = createNativeStackNavigator();

export const AltScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={({ navigation }) => ({
        header: props => <Header {...props} />,
      })}>
      <Stack.Screen name="MyPage" component={AltComponent} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="TimeLine" component={TimeLine} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditUsername" component={EditUsername} />
      <Stack.Screen name="EditIntroduction" component={EditIntroduction} />
      <Stack.Screen name="CircleCreate" component={CircleCreate} />
      <Stack.Screen name="CircleCreateName" component={CircleCreateName} />
      <Stack.Screen name="CircleCreateDesc" component={CircleCreateDesc} />
    </Stack.Navigator>
  );
};
