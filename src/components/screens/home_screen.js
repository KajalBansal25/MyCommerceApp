import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateSurname} from '../../actions/actions';

export default function HomeScreen({navigation, setIsLoggedin, isLoggedin}) {
  const {name, surname} = useSelector(state => {
    console.log(state);
    return state;
  });

  const dispatch = useDispatch();

  const updatName = name => {
    dispatch({type: 'UPDATE_NAME', payload: name});
  };

  const changeSurName = surname => {
    dispatch(updateSurname(surname));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
      <Text>{name}</Text>
      <Text>{surname}</Text>
      <Button title="Update name" onPress={() => updatName('jyoti')} />
      <Button title="Update surname" onPress={() => changeSurName('agrawal')} />
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
