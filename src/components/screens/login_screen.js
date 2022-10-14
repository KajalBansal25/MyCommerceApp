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

export default function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={{backgroundColor: 'pink', margin: 20}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Login Form</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              employee_email: '',
              password: '',
            }}
            onSubmit={(values, {resetForm}) => {
              console.log(values);
              console.log('its working!');
              navigation.navigate('Tab');
              resetForm({values: ''});
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

                <Button
                  onPress={handleSubmit}
                  title="Submit"
                  style={styles.submit}
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text>Not having an account?</Text>
          <Button
            title="Register here"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 12,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: 'blue',
    marginHorizontal: 70,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  submit: {
    width: '50%',
    backgroundColor: 'pink',
    color: 'yellow',
    margin: 50,
  },
});
