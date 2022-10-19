import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function AdminScreen({setIsLoggedin}) {
  const [dataForAdmin, setDataForAdmin] = useState([]);

  useEffect(() => {
    fetchDataForAdmin();
  }, []);

  function fetchDataForAdmin() {
    axios
      .get('https://dansir-backend.herokuapp.com/api/v1/find_data/find')
      .then(response => {
        setDataForAdmin(response.data.result);
        console.log('response in admin screen>>>>>>', response.data.result);
      });
  }

  return (
    <View>
      <Text style={{fontSize: 20, justifyContent: 'center'}}>Admin Screen</Text>
      {console.log('dataForAdmin>>>>>', dataForAdmin)}
      {dataForAdmin.map((data, i) => {
        console.log('data4567890987654345678', data.employee_name);
        return (
          <View key={i}>
            <Text style={styles.textInput}>
              Employee name : {data.employee_name}{' '}
            </Text>
            <Text style={styles.textInput}>
              employee code : {data.employee_code}
            </Text>
            <Text style={styles.textInput}>
              total amount to pay : {data.totalAmount}{' '}
            </Text>
            <Text style={styles.textInput}>actions : </Text>
            <View style={{margin: 10}}>
              <Button title="Pay" onPress={() => {}} />
            </View>
          </View>
        );
      })}
      <View style={{margin: 10}}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {backgroundColor: 'yellow', flexDirection: 'row'},
});
