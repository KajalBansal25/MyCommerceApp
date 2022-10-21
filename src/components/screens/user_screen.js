import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AllAction from '../../actions';
import {getTotalAmountOfUser, sendAmoundOfPurchased} from '../../service';

export default function UserScreen({setIsLoggedin, tokenValue}) {
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [isCallGetTotal, setIsCallGetTotal] = useState(false);
  const [amount, setAmount] = useState(0);
  const date = new Date();

  const userDetails = useSelector(state => state.userData);
  const toTalAmount = useSelector(state => state.totalAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    getTotalAmountOfUser(
      {employee_id: tokenValue},
      response => {
        setIsCallGetTotal(!isCallGetTotal);
        setAmount(response.data.data.totalAmount);
        dispatch(
          AllAction.userAction.setTotalAmount(response.data.data.totalAmount),
        );
      },
      error => {
        console.log(
          'error>>>userscreen>>>>getTotalUser>>>>>inside use effect>>>>',
          error.response.data,
        );
      },
    );
    console.log(
      'amount>>>userscreen>>>getTotalUser>>>>>iinside use effect>>>>',
      amount,
    );
  }, [toTalAmount]);

  const setAmountFunction = () => {
    sendAmoundOfPurchased(
      {
        employee_id: userDetails._id,
        employee_name: userDetails.employee_firstname,
        employee_code: userDetails.employee_code,
        amount: {date: date.getDate(), puchaseAmount: Number(purchaseAmount)},
      },
      response => {
        if (response.data.data) {
          console.log(
            'response.data.data>>>sendAmoundOfPurchased>>>>',
            response.data.data,
          );
          dispatch(
            AllAction.userAction.setTotalAmount(response.data.data.totalAmount),
          );
        }
      },
      error => {
        console.log(error);
      },
    );
  };

  return (
    <View>
      <Text style={styles.heading}>
        Hey, {userDetails.employee_firstname} welcome to your favourite place:
        Daffodil pantry
      </Text>
      <View style={styles.subContainer}>
        <Text style={styles.textStyle}>
          Your total amount is : {toTalAmount}
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
        <View style={{marginTop: 20}}>
          <Button
            title="submit purchase amount"
            onPress={setAmountFunction}
            color="blue"
          />
        </View>
        <View style={{margin: 20}}></View>
      </View>
      <View style={{margin: 20}}>
        <Button
          color="blue"
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
  heading: {fontSize: 30, fontWeight: 'bold', margin: 20, color: 'orange'},
  subContainer: {
    backgroundColor: 'lightgreen',
    elevation: 10,
    padding: 20,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 20,
  },
  textStyle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
});
