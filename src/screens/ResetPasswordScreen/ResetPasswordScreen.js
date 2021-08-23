import React, { useRef } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, Button, Subheading, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Formik } from 'formik';
import Alert from 'components/Alert';
import Background from 'components/Background';
import Input from 'components/Input/Input';
import Spacer from 'components/Spacer';
import validationSchema from 'utils/validationSchema';
import useClear from 'hooks/useClear';

const ResetPasswordScreen = ({ navigation, error, pending, clearError, resetPassword }) => {
  const formikRef = useRef(null);
  const { goBack } = navigation;

  useClear(clearError);

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header theme={{ colors: { primary: 'transparent' } }}>
          <Appbar.BackAction onPress={() => goBack()} />
          <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Zresetuj hasło" />
          <Appbar.Action />
        </Appbar.Header>
        <Spacer horizontal size={24}>
          <View style={{ marginTop: 48 }}>
            <Avatar.Icon
              style={{ backgroundColor: 'transparent', alignSelf: 'center' }}
              color="#DB2B38"
              size={128}
              icon="lock"
            />
            <Subheading style={{ textAlign: 'center' }}>Zapomniałeś hasła?</Subheading>
            <Spacer horizontal size={64}>
              <Paragraph>Podaj swój adres e-mail aby otrzymać dalesze instrukcje</Paragraph>
            </Spacer>
          </View>
          {error ? (
            <Spacer>
              <Alert type="error" message={error} />
            </Spacer>
          ) : null}
          <Formik
            ref={formikRef}
            initialValues={{ email: '' }}
            validationSchema={validationSchema(['email'])}
            onSubmit={({ email }) => {
              resetPassword({ email });
            }}
          >
            {formikProps => (
              <>
                <Input
                  tag={FontAwesome}
                  icon="envelope"
                  autoCapitalize="none"
                  autoCorrect={false}
                  formikProps={formikProps}
                  formikKey="email"
                  keyboardType="email-address"
                  placeholder="E-mail"
                />
                <Spacer>
                  <Button disabled={pending} loading={pending} mode="contained" onPress={formikProps.handleSubmit}>
                    Wyślij
                  </Button>
                </Spacer>
              </>
            )}
          </Formik>
        </Spacer>
      </SafeAreaView>
    </View>
  );
};

export default ResetPasswordScreen;
