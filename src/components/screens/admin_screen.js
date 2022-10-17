import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, Button} from 'react-native';

export default function AdminScreen({setIsLoggedin}) {
  return (
    <View>
      <Text>Admin Screen</Text>
      <Button
        title="logout"
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
