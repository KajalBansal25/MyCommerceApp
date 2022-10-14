import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home_screen';
import SettingsScreen from './screens/setting_screen';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
