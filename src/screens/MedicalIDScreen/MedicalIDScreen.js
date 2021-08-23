import React, { useEffect, useRef } from 'react';
import { Appbar, Button, Card, List } from 'react-native-paper';
import { Formik } from 'formik';
import Alert from 'components/Alert';
import Container from 'components/Container';
import DatePicker from 'components/DatePicker';
import Input from 'components/Input';
import KeyboardAvoidView from 'components/KeyboardAvoidView';
import ListPicker from 'components/ListPicker';
import Spacer from 'components/Spacer';
import Wrapper from 'components/Wrapper';
import bloodType from 'constants/bloodType';

const MedicalIDScreen = ({
  navigation,
  errorFetch,
  errorUpdate,
  pendingFetch,
  pendingUpdate,
  medicalID,
  fetchMedicalID,
  updateMedicalID,
}) => {
  const formikRef = useRef(null);

  const handleSubmit = values => {
    updateMedicalID(values);
  };

  const handleNavigation = () => {
    const { state } = navigation;
    if (state.params && state.params.prevScreen) {
      navigation.pop();
      navigation.navigate(state.params.prevScreen);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    fetchMedicalID();
  }, []);

  useEffect(() => {
    formikRef.current.resetForm(medicalID);
  }, [pendingFetch]);

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleNavigation} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Karta medyczna" />
        <Appbar.Action />
      </Appbar.Header>
      <Formik ref={formikRef} initialValues={medicalID} onSubmit={handleSubmit}>
        {formikProps => (
          <Container>
            <Card elevation={2} style={{ flex: 1, marginBottom: 16 }}>
              <Card.Content>
                <KeyboardAvoidView>
                  {errorFetch ? (
                    <Spacer>
                      <Alert type="error" message={errorFetch} />
                    </Spacer>
                  ) : null}
                  {errorUpdate ? (
                    <Spacer>
                      <Alert type="error" message={errorUpdate} />
                    </Spacer>
                  ) : null}
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="firstName"
                    label="Imię / imiona"
                  />
                  <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    formikProps={formikProps}
                    formikKey="lastName"
                    label="Nazwisko"
                  />
                  <DatePicker
                    formikProps={formikProps}
                    formikKey="dateOfDirth"
                    label="Data urodzenia"
                    cancelTextIOS="Powrót"
                    confirmTextIOS="Potwierdź"
                    maximumDate={new Date()}
                    mode="date"
                    titleIOS="Data urodzenia"
                    value={new Date()}
                  />
                  <List.Accordion title="Dane medyczne" style={{ paddingHorizontal: 0 }}>
                    <Input
                      formikProps={formikProps}
                      formikKey="medicalConditions"
                      multiline
                      numberOfLines={3}
                      maxLength={120}
                      label="Choroby"
                    />
                    <Input
                      formikProps={formikProps}
                      formikKey="allergies"
                      multiline
                      numberOfLines={3}
                      maxLength={120}
                      label="Alergie i reakcje"
                    />
                    <Input
                      formikProps={formikProps}
                      formikKey="medications"
                      multiline
                      numberOfLines={3}
                      maxLength={320}
                      label="Leki"
                    />
                    <ListPicker data={bloodType} formikProps={formikProps} formikKey="bloodType" label="Grupa krwi" />
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="decimal-pad"
                      formikProps={formikProps}
                      formikKey="height"
                      label="Wzrost"
                    />
                    <Input
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="decimal-pad"
                      formikProps={formikProps}
                      formikKey="weight"
                      label="Waga"
                    />
                  </List.Accordion>
                </KeyboardAvoidView>
              </Card.Content>
            </Card>
            <Button
              disabled={pendingFetch || pendingUpdate}
              loading={pendingFetch || pendingUpdate}
              mode="contained"
              onPress={formikProps.handleSubmit}
            >
              Zapisz
            </Button>
          </Container>
        )}
      </Formik>
    </Wrapper>
  );
};

export default MedicalIDScreen;
