import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {showAllAdminData} from '../../service';

export default function AdminScreen({setIsLoggedin}) {
  const [dataForAdmin, setDataForAdmin] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userInput, setUserInput] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    showAllAdminData(
      response => {
        console.log(response.data.result);
        setDataForAdmin(response.data.result);
      },
      err => console.log(err.response.data),
    );
    console.log('Runnn_===', dataForAdmin);
  }, [showModal]);

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Modal
          animationType="slide"
          visible={showModal}
          style={{backgroundColor: 'red'}}>
          <View style={{justifyContent: 'center', flex: 1, margin: 20}}>
            <Text style={{fontSize: 25, color: 'orange'}}>
              Enter amount to pay :
            </Text>
            <TextInput
              placeholder="purchaseAmount"
              style={styles.input}
              onChangeText={value => {
                value = setUserInput(value);
              }}
              defaultValue={0}
            />
            <Button
              title="pay"
              onPress={() => {
                axios
                  .post(
                    'https://dansir-backend.herokuapp.com/api/v1/money/get_money',
                    {
                      // employee_id: '6350d50fcf883283aab25dc7',
                      employee_id: userId,

                      get_money: Number(userInput),
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    },
                  )
                  .then(response => {
                    console.log('modal screen', response.data);
                    setShowModal(false);
                  })
                  .catch(
                    err =>
                      console.log(
                        'error in modal screen',
                        err,
                        err.response.data,
                      ),
                    setShowModal(false),
                  );
              }}
              color="blue"
            />
          </View>
        </Modal>
        <Text
          style={{
            fontSize: 30,
            color: 'orange',
            fontWeight: '700',
            margin: 20,
          }}>
          Welcome Dan,
        </Text>
      </View>
      {dataForAdmin.map((data, i) => {
        console.log('data>>>>>>>', data);
        return (
          <ScrollView key={i}>
            <View style={{backgroundColor: 'lightgreen', margin: 20}}>
              <Text style={styles.textInput}>
                Employee name : {data.employee_name}
              </Text>
              <Text style={styles.textInput}>
                employee code : {data.employee_code}
              </Text>
              <Text style={styles.textInput}>
                total amount to pay : {data.totalAmount}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textInput}>actions : {}</Text>
                <View style={{justifyContent: 'center'}}>
                  <Button
                    title="Pay"
                    color="blue"
                    onPress={() => {
                      setUserId(data.employee_id);
                      setShowModal(true);
                    }}
                  />
                  {console.log('userid---------', userId)}
                </View>
              </View>
            </View>
          </ScrollView>
        );
      })}
      <View style={{margin: 20}}>
        <Button
          title="logout"
          color="blue"
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
  textInput: {
    flexDirection: 'row',
    margin: 10,
    fontSize: 20,
    fontWeight: '400',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
    marginVertical: 20,
  },
  textStyle: {fontSize: 20, fontWeight: 'bold', marginBottom: 10},
});
