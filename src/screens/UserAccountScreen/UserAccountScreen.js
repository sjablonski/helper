import React, { useRef, useState } from 'react';
import { Appbar, Button, Card, Caption, List, Paragraph } from 'react-native-paper';
import { Formik } from 'formik';
import * as firebase from 'firebase';
import Alert from 'components/Alert';
import Container from 'components/Container';
import Input from 'components/Input';
import Spacer from 'components/Spacer';
import VerificationModal from 'components/VerificationModal';
import Wrapper from 'components/Wrapper';
import useNavigationEvents from 'hooks/useNavigationEvents';
import reCaptcha from 'utils/reCaptcha';
import validationSchema from 'utils/validationSchema';
import styles from './styles';

const UserAccountScreen = ({ navigation, error, pending, email, phoneNumber, updateUserData, addError, clearError }) => {
  const formikRef = useRef(null);
  const modalRef = useRef(null);
  const [values, setValues] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [pendingVerif, setPendingVerif] = useState(false);

  useNavigationEvents('willBlur', () => {
    formikRef.current.resetForm();
    clearError();
  });

  const handleModalSubmit = code => {
    setPendingVerif(true);
    try {
      const phoneCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      if (phoneCredential) {
        modalRef.current.addError(null);
        modalRef.current.close();
        updateUserData({ ...values, phoneNumber: phoneCredential });
      }
    } catch (err) {
      modalRef.current.addError(err);
    }
    setPendingVerif(false);
  };

  const verificationPhoneNumber = async newPhoneNumber => {
    const token = await reCaptcha();
    if (token) {
      const captchaVerifier = {
        type: 'recaptcha',
        verify: () => Promise.resolve(token),
      };
      try {
        const provider = new firebase.auth.PhoneAuthProvider();
        const id = await provider.verifyPhoneNumber(newPhoneNumber, captchaVerifier);
        setVerificationId(id);
        modalRef.current.open();
      } catch (err) {
        addError(err);
      }
    }
  };

  const handleNavigation = () => {
    navigation.toggleDrawer();
  };

  const handleSubmit = data => {
    if (phoneNumber !== data.phoneNumber) {
      setValues(data);
      verificationPhoneNumber(data.phoneNumber);
    } else {
      updateUserData(data);
    }
  };

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={handleNavigation} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Profil użytkownika" />
        <Appbar.Action />
      </Appbar.Header>
      <Container isKeyboard>
        <Formik
          ref={formikRef}
          initialValues={{
            email,
            phoneNumber,
            newPassword: '',
            newConfirmPassword: '',
            password: '',
          }}
          validationSchema={validationSchema(['email', 'phoneNumber', 'newPassword', 'newConfirmPassword', 'password'])}
          onSubmit={data => handleSubmit(data)}
        >
          {formikProps => (
            <>
              <Caption style={styles.caption}>Dane konta</Caption>
              <Card elevation={2}>
                <Card.Content>
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
                  <List.Accordion title="Zmień hasło" style={{ paddingHorizontal: 0 }}>
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      formikProps={formikProps}
                      formikKey="newPassword"
                      label="Hasło"
                      secureTextEntry
                    />
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      formikProps={formikProps}
                      formikKey="newConfirmPassword"
                      label="Powtórz hasło"
                      secureTextEntry
                    />
                  </List.Accordion>
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="password"
                    label="Aktualne hasło"
                    secureTextEntry
                  />
                </Card.Content>
                <Card.Actions style={{ flexDirection: 'row-reverse' }}>
                  <Button disabled={pending} loading={pending} onPress={formikProps.handleSubmit}>
                    Zapisz
                  </Button>
                </Card.Actions>
              </Card>
            </>
          )}
        </Formik>
        <Caption style={styles.caption}>Informacje medyczne</Caption>
        <Card>
          <Card.Content>
            <Paragraph>
              Karta medyczna oraz kontakty alarmowe umożliwią jednostkom ratunkowym uzyskanie dostępu do krytycznych informacji
              medycznych oraz informację o osobie, z którą należy się skontaktować w nagłym wypadku.
            </Paragraph>
          </Card.Content>
          <Card.Actions style={{ flexDirection: 'row-reverse' }}>
            <Button uppercase={false} onPress={() => navigation.navigate('EmergencyContact')}>
              kontakty alarmowe
            </Button>
            <Button uppercase={false} onPress={() => navigation.navigate('MedicalID')}>
              karta medyczna
            </Button>
          </Card.Actions>
        </Card>
      </Container>
      {verificationId && <VerificationModal ref={modalRef} pending={pendingVerif} onSubmit={handleModalSubmit} />}
    </Wrapper>
  );
};

export default UserAccountScreen;
