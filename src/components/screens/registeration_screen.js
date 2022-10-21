import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAccountApi} from '../../service';

const registerValidationSchema = yup.object().shape({
  employee_firstname: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  employee_lastname: yup
    .string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  employee_email: yup.string().email('Invalid email').required('Required'),
  employee_code: yup
    .string()
    .min(
      3,
      ({min}) => `Employee employee_code must be at least ${min} characters`,
    )
    .required('Employee employee_code is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export default function RegisterationScreen({navigation, setIsLoggedin}) {
  const createAccountApiData = values => {
    createAccountApi(
      values,
      async response => {
        if (response.data.data) {
          console.log(response.data.status);
          try {
            await AsyncStorage.setItem('@storage_Key', response.data.data._id);
            setIsLoggedin(true);
          } catch (e) {
            console.log('error>>>>', e);
          }
        }
      },
      err => console.log(err.response.data),
    );
  };
  return (
    <SafeAreaView>
      <Text style={styles.text}>Registeration Form</Text>

      <ScrollView style={{backgroundColor: 'pink', margin: 20}}>
        <View style={styles.container}>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              employee_email: '',
              employee_firstname: '',
              employee_lastname: '',
              employee_code: 0,
              password: '',
              confirmPassword: '',
            }}
            onSubmit={(values, {resetForm}) => {
              setIsLoggedin(true);
              console.log(values);
              console.log('its working!');
              resetForm({values: ''});
              createAccountApiData(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <TextInput
                  name="employee_email"
                  placeholder="enter your employee_email"
                  style={styles.input}
                  onChangeText={handleChange('employee_email')}
                  onBlur={handleBlur('employee_email')}
                  value={values.employee_email}
                  keyboardType="email-address"
                />
                {errors.employee_email && touched.employee_email && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.employee_email}
                  </Text>
                )}
                <TextInput
                  name="employee_firstname"
                  placeholder="enter your employee_firstname"
                  style={styles.input}
                  onChangeText={handleChange('employee_firstname')}
                  onBlur={handleBlur('employee_firstname')}
                  value={values.employee_firstname}
                  keyboardType="ascii-capable"
                />
                {errors.employee_firstname && touched.employee_firstname && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.employee_firstname}
                  </Text>
                )}
                <TextInput
                  name="employee_lastname"
                  placeholder="enter your employee_lastname"
                  style={styles.input}
                  onChangeText={handleChange('employee_lastname')}
                  onBlur={handleBlur('employee_lastname')}
                  value={values.employee_lastname}
                  keyboardType="ascii-capable"
                />
                {errors.employee_lastname && touched.employee_lastname && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.employee_lastname}
                  </Text>
                )}
                <TextInput
                  name="employee_code"
                  placeholder="enter your employeeemployee_code"
                  style={styles.input}
                  onChangeText={handleChange('employee_code')}
                  onBlur={handleBlur('employee_code')}
                  value={values.employee_code}
                  keyboardType="numeric"
                />
                {errors.employee_code && touched.employee_code && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.employee_code}
                  </Text>
                )}
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.password}
                  </Text>
                )}
                <TextInput
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  style={styles.input}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <Button
                  color="blue"
                  onPress={handleSubmit}
                  title="Submit"
                  style={styles.submit}
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 18}}>Already have an account? </Text>
        <Button
          color="blue"
          title="Login here"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
  },
  text: {
    fontSize: 28,
    margin: 20,
    color: 'orange',
    marginHorizontal: 70,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  submit: {
    width: '50%',
    color: 'yellow',
    margin: 50,
  },
});
