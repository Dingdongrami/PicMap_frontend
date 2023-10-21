import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search, TimeLine } from "../../../screens";
import { Header } from "../Header";
import { AltComponent } from '../../middle/Stack/AltComponent';

const Stack = createNativeStackNavigator();

export const AltScreen = () => {
  return(
    <Stack.Navigator 
      initialRouteName="MyPage"
      screenOptions={({ navigation }) => ({
        header: (props) => <Header {...props} />,
      })}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="TimeLine" component={TimeLine} />
      <Stack.Screen name="MyPage" component={AltComponent} />
    </Stack.Navigator>
  )
}
