import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export default function UserScreen({setIsLoggedin}) {
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const date = new Date();

  const userDetails = useSelector(state => state.userData);

  function setData() {
    console.log('user>>>>>', userDetails);

    const userData = {
      employee_id: userDetails._id,
      employee_name: userDetails.employee_firstname,
      employee_code: userDetails.employee_code,
      amount: {date: date.getDate(), puchaseAmount: 10},
    };

    console.log('userdata2356789>>>>', userData);
    axios
      .post(
        'https://dansir-backend.herokuapp.com/api/v1/amount/amount_user',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('userdata response!', response.data.data);

        if (response.data.data) {
          console.log('response.data.data>>>', response.data.data);
        }
      })
      .catch(error => {
        console.log('error>>>', error.response.data);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.textStyle}>User Screen</Text>
        <Text style={styles.textStyle}>Welcome to pantry</Text>
        <Text style={styles.textStyle}>
          Hey, {userDetails.employee_firstname} welcome to your favourite
          place:pantry
        </Text>
        <Text style={styles.textStyle}>Your total amount is -----</Text>
        <Text style={styles.textStyle}>Please enter your purchase amount</Text>
        <TextInput
          placeholder="purchaseAmount"
          style={styles.input}
          onChangeText={value => setPurchaseAmount(value)}
          defaultValue={purchaseAmount}
        />
        <Button title="submit purchase amount" onPress={() => setData()} />
        <View style={{marginBottom: 20}}></View>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center',
  },
  subContainer: {backgroundColor: 'pink', elevation: 10, padding: 20},
  input: {
    width: '100%',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
    marginTop: 10,
  },
  textStyle: {fontSize: 15, fontWeight: 'bold', marginBottom: 10},
});
