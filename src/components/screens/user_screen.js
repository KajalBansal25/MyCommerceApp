import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AllAction from '../../actions';

export default function UserScreen({setIsLoggedin, tokenValue}) {
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [isCallGetTotal, setIsCallGetTotal] = useState(false);
  const [amount, setAmount] = useState(0);
  const date = new Date();

  const userDetails = useSelector(state => state.userData);
  const toTalAmount = useSelector(state => state.totalAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    getTotalUser();
  }, [toTalAmount]);

  function getTotalUser() {
    axios
      .post(
        'https://dansir-backend.herokuapp.com/api/v1/get_Total_user',
        {employee_id: tokenValue},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('response>>>getTotalUser>>>>', response.data.data);
        setIsCallGetTotal(!isCallGetTotal);
        setAmount(response.data.data.totalAmount);
        dispatch(
          AllAction.userAction.setTotalAmount(response.data.data.totalAmount),
        );
        if (response.data.data) {
          console.log(
            'response.data.data>>>getTotalUser>>>>',
            response.data.data,
          );
        }
      })
      .catch(error => {
        console.log('error>>>getTotalUser>>>>>', error.response.data);
      });
  }

  function setData() {
    console.log('user>>>>>', userDetails);
    const userData = {
      employee_id: userDetails._id,
      employee_name: userDetails.employee_firstname,
      employee_code: userDetails.employee_code,
      amount: {date: date.getDate(), puchaseAmount: Number(purchaseAmount)},
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
          console.log('response.data.data>>>setData>>>>', response.data.data);
          dispatch(
            AllAction.userAction.setTotalAmount(response.data.data.totalAmount),
          );
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
        <Text style={styles.textStyle}>
          Your total amount is -----{toTalAmount}
        </Text>
        <Text style={styles.textStyle}>Please enter your purchase amount</Text>
        <TextInput
          placeholder="purchaseAmount"
          style={styles.input}
          onChangeText={value => {
            value >= 0 ? setPurchaseAmount(value) : setPurchaseAmount(0);
          }}
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
