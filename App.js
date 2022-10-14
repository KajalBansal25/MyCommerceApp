import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './src/components/screens/detail_screen';
import HomeScreen from './src/components/screens/home_screen';
import RegisterationScreen from './src/components/screens/registeration_screen';
import SignUp from './src/components/screens/Signup_screen';
import MyTabs from './src/components/my_tabs';
import LoginScreen from './src/components/screens/login_screen';
import SplashScreen from './src/components/screens/splash_screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import SettingsScreen from './src/components/screens/setting_screen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  async function fetchData() {
    const token = await AsyncStorage.getItem('@storage_Key');
    console.log('token--->>>>>', token);
    if (token) {
      return setIsLoggedin(true);
    } else {
      return setIsLoggedin(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoggedin) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Register" component={RegisterationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={MyTabs} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Setting" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
