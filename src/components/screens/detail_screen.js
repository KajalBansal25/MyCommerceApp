import {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import axios from 'axios';

export default function DetailScreen({navigation, route}) {
  // const {
  //   employee_email,
  //   employee_firstname,
  //   employee_lastname,
  //   employee_code,
  //   password,
  // } = route.params;

  useEffect(() => {
    axios
      .post(
        ' http://192.168.3.212:3000/api/v1/get_user_data',
        {employee_id: '6347b5ac1d02e561fb506fb4'},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('response.data>>>>', response.data);
        console.log('response.status>>>>>>>', response.status);
        console.log('response.statusText>>>>>', response.statusText);
        console.log('response.headers>>>>>', response.headers);
        console.log('response.config>>>>', response.config);
      })
      .catch(err => console.log('>>>>>', err));
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.input}>{employee_firstname}</Text>
      <Text style={styles.input}>{employee_lastname}</Text>
      <Text style={styles.input}>{employee_email}</Text>
      <Text style={styles.input}>{employee_code}</Text>
      <Text style={styles.input}>{password}</Text> */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Tab" onPress={() => navigation.navigate('Tab')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margi: 20,
    backgroundColor: 'yellow',
    flex: 1,
  },
  input: {
    padding: 12,
    fontSize: 25,
    color: 'red',
  },
});
