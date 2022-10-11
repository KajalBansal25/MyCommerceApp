import {Text, View, StyleSheet, Button} from 'react-native';

export default function DetailScreen({navigation, route}) {
  const {email, firstName, lastName, employeeCode, password, confirmPassword} =
    route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.input}>{firstName}</Text>
      <Text style={styles.input}>{lastName}</Text>
      <Text style={styles.input}>{email}</Text>
      <Text style={styles.input}>{employeeCode}</Text>
      <Text style={styles.input}>{password}</Text>
      <Text style={styles.input}>{confirmPassword}</Text>
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
