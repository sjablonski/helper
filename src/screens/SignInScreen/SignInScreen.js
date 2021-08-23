import React, { useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import Alert from 'components/Alert';
import Background from 'components/Background';
import Input from 'components/Input';
import Spacer from 'components/Spacer';
import validationSchema from 'utils/validationSchema';
import useNavigationEvents from 'hooks/useNavigationEvents';
import LogoHelper from 'assets/LogoHelper';
import styles from './SignInScreen.styles';

const SignInScreen = ({ navigation, error, pending, clearError, signIn }) => {
  const formikRef = useRef(null);

  useNavigationEvents('didBlur', () => {
    formikRef.current.resetForm();
    clearError();
  });

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 120 }}>
            <LogoHelper width="220px" height="55px" color="#d0142b" />
            <Formik
              ref={formikRef}
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema(['email', 'password'])}
              onSubmit={values => signIn({ email: values.email, password: values.password })}
            >
              {formikProps => (
                <Spacer horizontal size={24}>
                  <Spacer>{error ? <Alert type="error" message={error} /> : null}</Spacer>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="email"
                    keyboardType="email-address"
                    label="Email"
                    returnKeyType="next"
                  />
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="password"
                    label="Hasło"
                    onSubmitEditing={formikProps.handleSubmit}
                    returnKeyType="done"
                    secureTextEntry
                  />
                  <View style={styles.resetPassword}>
                    <Button mode="text" uppercase={false} onPress={() => navigation.navigate('ResetPassword')}>
                      Zresetuj hasło
                    </Button>
                  </View>
                  <Spacer>
                    <Button mode="contained" loading={pending} onPress={formikProps.handleSubmit}>
                      Zaloguj
                    </Button>
                  </Spacer>
                </Spacer>
              )}
            </Formik>
          </View>
        </View>
        <View>
          <Button mode="outlined" uppercase={false} onPress={() => navigation.navigate('SignUp')}>
            Nie masz konta? Zarejestruj się
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignInScreen;
