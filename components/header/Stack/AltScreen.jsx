import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search, TimeLine, MyPage } from "../../../screens";
import { Header } from "../Header";

const Stack = createNativeStackNavigator();

export const AltScreen = () => {
  const right = () => {
    console.log("right?");
  }
  return(
    <Stack.Navigator 
      initialRouteName="MyPage"
      screenOptions={({ navigation }) => ({
        header: (props) => <Header {...props} />,
      })}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="TimeLine" component={TimeLine} />
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  )
}
