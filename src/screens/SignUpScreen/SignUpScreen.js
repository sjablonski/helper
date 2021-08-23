import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Appbar, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as firebase from 'firebase';
import Alert from 'components/Alert';
import Background from 'components/Background';
import Checkbox from 'components/Checkbox';
import Container from 'components/Container';
import Input from 'components/Input';
import Spacer from 'components/Spacer';
import VerificationModal from 'components/VerificationModal';
import validationSchema from 'utils/validationSchema';
import useClear from 'hooks/useClear';
import reCaptcha from 'utils/reCaptcha';

const SignUpScreen = ({ navigation, error, pending, addError, clearError, signUp }) => {
  useClear(clearError);
  const [values, setValues] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [pendingVerif, setPendingVerif] = useState(false);
  const modalRef = useRef(null);
  const { goBack } = navigation;

  const handleSubmit = code => {
    setPendingVerif(true);
    try {
      const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      if (phoneCredential) {
        modalRef.current.addError(null);
        modalRef.current.close();
        signUp({ ...values, phoneNumber: phoneCredential });
      }
    } catch (err) {
      modalRef.current.addError(err);
    }
    setPendingVerif(false);
  };

  const verificationPhoneNumber = async phoneNumber => {
    const token = await reCaptcha();
    if (token) {
      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token),
      };
      try {
        const provider = new firebase.auth.PhoneAuthProvider();
        const id = await provider.verifyPhoneNumber(phoneNumber, captchaVerifier);
        setVerificationId(id);
        modalRef.current.open();
      } catch (err) {
        addError(err);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Appbar.Header theme={{ colors: { primary: 'transparent' } }}>
            <Appbar.BackAction onPress={() => goBack()} />
            <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Rejestracja" />
            <Appbar.Action />
          </Appbar.Header>
          <Formik
            initialValues={{
              email: '',
              phoneNumber: '',
              password: '',
              confirmPassword: '',
              agreeToTerms: true,
            }}
            validationSchema={validationSchema(['email', 'phoneNumber', 'password', 'confirmPassword', 'agreeToTerms'])}
            onSubmit={val => {
              setValues(val);
              verificationPhoneNumber(val.phoneNumber);
            }}
          >
            {formikProps => (
              <Container isKeyboard>
                <Spacer horizontal size={24}>
                  {error ? (
                    <Spacer>
                      <Alert type="error" message={error} />
                    </Spacer>
                  ) : null}
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="email"
                    keyboardType="email-address"
                    label="E-mail"
                  />
                  <Input formikProps={formikProps} formikKey="phoneNumber" keyboardType="phone-pad" label="Numer telefonu" />
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="password"
                    label="Hasło"
                    secureTextEntry
                  />
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="confirmPassword"
                    label="Powtórz hasło"
                    secureTextEntry
                  />
                  <Spacer>
                    <Checkbox formikProps={formikProps} formikKey="agreeToTerms" label="Akceptuję regulamin" />
                  </Spacer>
                  <Spacer>
                    <Button loading={pending} mode="contained" onPress={formikProps.handleSubmit}>
                      Wyślij
                    </Button>
                  </Spacer>
                </Spacer>
              </Container>
            )}
          </Formik>
          {verificationId && <VerificationModal ref={modalRef} pending={pendingVerif} onSubmit={handleSubmit} />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SignUpScreen;
