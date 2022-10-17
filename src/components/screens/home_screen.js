import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {Button, Text, View} from 'react-native';

export default function HomeScreen({setIsLoggedin}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>

      <Button
        title="Logout"
        onPress={async () => {
          try {
            await AsyncStorage.removeItem('@storage_Key');
            setIsLoggedin(false);
          } catch (e) {
            console.log('error in logout>>>', e);
          }
          console.log('Done.');
        }}
      />
    </View>
  );
}
