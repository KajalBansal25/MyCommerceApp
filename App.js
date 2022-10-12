import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './src/components/screens/detail_screen';
import RegisterationScreen from './src/components/screens/registeration_screen';
import SignUp from './src/components/screens/Signup_screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={RegisterationScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
