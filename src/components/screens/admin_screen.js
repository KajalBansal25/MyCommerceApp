import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {showAllAdminData} from '../../service';
import Config from 'react-native-config';

export default function AdminScreen({setIsLoggedin}) {
  const [dataForAdmin, setDataForAdmin] = useState([]);

  useEffect(() => {
    showAllAdminData(
      response => {
        setDataForAdmin(response.data.result);
      },
      err => console.log(err.response.data),
    );
  }, []);

  return (
    <View>
      <Text style={{fontSize: 20, justifyContent: 'center'}}>Admin Screen</Text>
      {dataForAdmin.map((data, i) => {
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
