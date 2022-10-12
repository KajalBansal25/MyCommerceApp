import {Text, View, StyleSheet, Button} from 'react-native';

export default function DetailScreen({navigation, route}) {
  const {
    employee_email,
    employee_firstname,
    employee_lastname,
    employee_code,
    password,
  } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.input}>{employee_firstname}</Text>
      <Text style={styles.input}>{employee_lastname}</Text>
      <Text style={styles.input}>{employee_email}</Text>
      <Text style={styles.input}>{employee_code}</Text>
      <Text style={styles.input}>{password}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margi: 20,
  },
  input: {
    padding: 12,
    fontSize: 25,
    color: 'red',
    
  },
});
