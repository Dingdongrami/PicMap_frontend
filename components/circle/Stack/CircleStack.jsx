import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CircleCreate } from "../../../screens/createCircle/CircleCreate";
import { Circle } from "../../../screens/mycomponent";

const Stack = createNativeStackNavigator();

export const CircleStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="CreateCircleBtn" component={Circle}  />
      <Stack.Screen name="CircleCreate" component={CircleCreate}  />
    </Stack.Navigator>
  );
};



//circle에 대해서 createcirclebtn과 circle create 컴포넌트를 달 수 있음