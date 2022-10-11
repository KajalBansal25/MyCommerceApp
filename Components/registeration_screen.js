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

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  firstName: yup
    .string()
    .min(3, ({min}) => `Firstname must be at least ${min} characters`)
    .required('Firstname is required'),
  lastName: yup
    .string()
    .min(3, ({min}) => `Lastname must be at least ${min} characters`)
    .required('Lastname is required'),
  code: yup
    .string()
    .min(3, ({min}) => `Employee code must be at least ${min} characters`)
    .required('Employee code is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(8, ({min}) => `Confirm password must be at least ${min} characters`)
    .required('PConfirm password is required'),
});

export default function RegisterationScreen({navigation}) {
  // navigation.navigate('Detail', {
  //   email,
  //   firstName,
  //   lastName,
  //   employeeCode,
  //   password,
  //   confirmPassword,
  // });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Registeration Form</Text>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              code: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={values => console.log(values)}>
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
                  name="email"
                  placeholder="enter your email"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {(errors.email && touched.email) && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.email}
                  </Text>
                )}
                <TextInput
                  name="firstName"
                  placeholder="enter your firstName"
                  style={styles.input}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  keyboardType="ascii-capable"
                />
                {(errors.firstName && touched.firstName)&& (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.firstName}
                  </Text>
                )}
                <TextInput
                  name="lastName"
                  placeholder="enter your lastName"
                  style={styles.input}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  keyboardType="ascii-capable"
                />
                {(errors.lastName && touched.lastName) && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.lastName}
                  </Text>
                )}
                <TextInput
                  name="code"
                  placeholder="enter your employeeCode"
                  style={styles.input}
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  value={values.code}
                  keyboardType="numeric"
                />
                {(errors.code && touched.code) && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.code}
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
                {(errors.password && touched.password) && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.password}
                  </Text>
                )}
                <TextInput
                  name="confirmPassword"
                  placeholder="confirm password"
                  style={styles.input}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={true}
                />
                {(errors.confirmPassword && touched.confirmPassword) && (
                  <Text style={{fontSize: 10, color: 'red', marginBottom: 10}}>
                    {errors.confirmPassword}
                  </Text>
                )}
                <Button onPress={handleSubmit} title="Submit" style={styles.submit} isValid />
              </>
            )}
          </Formik>
          {/* 
        
          <TextInput
            placeholder="password"
            keyboardType="visible-password"
            onChangeText={value => setPassword(value)}
            style={styles.input}
          />
         
          <Button title="Submit"  onPress={pressHandler} /> */}
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
    fontSize: 25,
    marginBottom: 20,
    color: 'red',
    marginHorizontal:70,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor:'white'
  },
  submit: {
    width:"50%",
    backgroundColor:'pink',color:'yellow',margin:50,
  },
});
