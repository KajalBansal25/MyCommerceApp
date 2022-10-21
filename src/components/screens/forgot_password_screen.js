import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button, Modal} from 'react-native';
import {forgetPasswordApi} from '../../service';

export default ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [res, setRes] = useState(false);

  const forgetPasswordApiData = () => {
    forgetPasswordApi(
      {
        employee_email: email,
      },
      response => {
        console.log('response in forgot screen', response);
        setRes(true);
        setShowModal(true);
      },
      err => {
        console.log('error in forgot password screen', err, err.response.data),
          setError(err.response.data),
          setShowModal(true);
      },
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', margin: 40}}>
      <Text style={{marginVertical: 20, fontSize: 25, color: 'orange'}}>
        Forgot password
      </Text>
      <TextInput
        placeholder="enter your employee_email"
        style={styles.input}
        onChangeText={value => setEmail(value)}
      />
      <Button
        title="Submit"
        color="blue"
        onPress={() => {
          console.log(email);
          forgetPasswordApiData();
        }}
      />
      <Modal
        animationType="slide"
        visible={showModal}
        style={{backgroundColor: 'red'}}>
        <View style={{justifyContent: 'center', flex: 1, margin: 20}}>
          {res ? (
            <Text style={{fontSize: 25, color: 'orange'}}>Thankyou</Text>
          ) : (
            <Text style={{fontSize: 25, color: 'orange'}}>{error}</Text>
          )}
          <Button title="back" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});
