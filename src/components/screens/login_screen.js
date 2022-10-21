import {
  ActivityIndicator,
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
import {useDispatch} from 'react-redux';
import AllAction from '../../actions';
import {useState} from 'react';
import {logInApi} from '../../service';

const loginValidationSchema = yup.object().shape({
  employee_email: yup.string().email('Invalid email').required('Required'),
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
});

export default function LoginScreen({navigation, setIsLoggedin}) {
  const [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();

  const loginApiData = values => {
    logInApi(
      values,
      async response => {
        dispatch(AllAction.userAction.fetchUserData(response.data.data));
        if (response.data.data) {
          try {
            await AsyncStorage.setItem('@storage_Key', response.data.data._id);
            setIsLoggedin(true);
          } catch (e) {
            console.log('error>>>>', e);
          }
        }
        setIsLoading(false);
      },
      err => console.log(err.response.data),
    );
  };
  return (
    <SafeAreaView>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Login Form</Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: 'pink',
          marginHorizontal: 20,
          marginVertical: 20,
          paddingBottom: 20,
        }}>
        <View style={styles.container}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              employee_email: '',
              password: '',
            }}
            onSubmit={async (values, {resetForm}) => {
              setIsLoading(true);
              console.log(values);
              console.log('its working!');
              resetForm({values: ''});
              loginApiData(values);
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <Button
                    color="blue"
                    onPress={handleSubmit}
                    title="Submit"
                    style={styles.submit}
                    disabled={!isValid}
                  />
                  <Button
                    color="blue"
                    title="forgot password"
                    onPress={() => navigation.navigate('Forgot')}
                  />
                </View>
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
        }}>
        <Text style={{fontSize: 19}}>Not having an account?</Text>
        <Button
          color="blue"
          title="Register here"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      {isLoading ? <ActivityIndicator size={80} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
  },
  text: {
    fontSize: 40,
    marginVertical: 20,
    color: 'orange',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  submit: {
    width: '50%',
    margin: 50,
  },
});
