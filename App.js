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
import UserScreen from './src/components/screens/user_screen';
import AdminScreen from './src/components/screens/admin_screen';
import {useDispatch, useSelector} from 'react-redux';
import AllAction from './src/actions';
import {getUserData} from './src/service';
import ForgotPasswordScreen from './src/components/screens/forgot_password_screen';

const Stack = createNativeStackNavigator();

export default function App() {
  const isUserAdmin = useSelector(state => state.userData.isAdmin);
  let dispatch = useDispatch();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [tokenValue, setTokenValue] = useState('');

  async function fetchData() {
    const token = await AsyncStorage.getItem('@storage_Key');
    setTokenValue(token);
    if (token) {
      return setIsLoggedin(true);
    } else {
      return setIsLoggedin(false);
    }
  }

  useEffect(() => {
    fetchData();
    getUserData(
      {employee_id: tokenValue},
      response => {
        dispatch(AllAction.userAction.fetchUserData(response.data.data));
      },
      err => console.log(err.response.data),
    );
  }, [isLoggedin, tokenValue]);

  return (
    <NavigationContainer>
      {isLoggedin ? (
        isUserAdmin ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Admin" options={{headerShown: false}}>
              {props => (
                <AdminScreen
                  {...props}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Tab" options={{headerShown: false}}>
              {props => (
                <MyTabs
                  {...props}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Setting" component={SettingsScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="User" options={{headerShown: false}}>
              {props => (
                <UserScreen
                  {...props}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                  tokenValue={tokenValue}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {props => (
                <HomeScreen
                  {...props}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Tab" options={{headerShown: false}}>
              {props => (
                <MyTabs
                  {...props}
                  isLoggedin={isLoggedin}
                  setIsLoggedin={setIsLoggedin}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Setting" component={SettingsScreen} />
          </Stack.Navigator>
        )
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Register">
            {props => (
              <RegisterationScreen
                {...props}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {props => (
              <LoginScreen
                {...props}
                isLoggedin={isLoggedin}
                setIsLoggedin={setIsLoggedin}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
          <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
      )}
      <Stack.Screen name="Splash" component={SplashScreen} />
    </NavigationContainer>
  );
}
