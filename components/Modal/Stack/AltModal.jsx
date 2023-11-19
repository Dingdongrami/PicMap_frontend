import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomModal } from "../Modal";
import { NestedModal } from "../NestedModal";
// import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

// export const AltModal = () => {
//   return(
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Group screenOptions={{ presentation: 'modal'}}>
//           <Stack.Screen name="BottomModal" component={BottomModal} />
//           <Stack.Screen name="NestedModal" component={NestedModal} />
//         </Stack.Group>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };