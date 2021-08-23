import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Card, IconButton, List } from 'react-native-paper';
import { Formik } from 'formik';
import Alert from 'components/Alert';
import Container from 'components/Container';
import Input from 'components/Input';
import KeyboardAvoidView from 'components/KeyboardAvoidView';
import Spacer from 'components/Spacer';
import Wrapper from 'components/Wrapper';

const EmergencyContactScreen = ({
  navigation,
  errorFetch,
  errorUpdate,
  pendingFetch,
  pendingUpdate,
  emergencyContact,
  fetchEmergencyContact,
  updateEmergencyContact,
}) => {
  const formikRef = useRef(null);
  const [disabled, setDisabled] = useState(false);

  const handleAddNewItem = () => {
    const {
      state: { values },
      setFieldValue,
    } = formikRef.current;
    if (values.emergencyContact.length < 3) {
      setFieldValue('emergencyContact', values.emergencyContact.concat([{ name: null, number: null }]));
    } else {
      setDisabled(true);
    }
  };

  const handleRemoveItem = index => {
    const {
      state: { values },
      setFieldValue,
    } = formikRef.current;
    setFieldValue(
      'emergencyContact',
      values.emergencyContact.filter((_contact, i) => i !== index),
    );
    setDisabled(false);
  };

  const handleSubmit = values => {
    updateEmergencyContact(values);
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
    fetchEmergencyContact();
  }, []);

  useEffect(() => {
    formikRef.current.resetForm({ emergencyContact });
  }, [pendingFetch]);

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleNavigation} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Kontakty alarmowe" />
        <Appbar.Action icon="plus" size={32} disabled={disabled} onPress={handleAddNewItem} />
      </Appbar.Header>
      <Formik ref={formikRef} initialValues={{ emergencyContact }} onSubmit={handleSubmit}>
        {formikProps => (
          <Container>
            <View style={{ flex: 1, marginBottom: 16 }}>
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
                {formikProps.values.emergencyContact &&
                  formikProps.values.emergencyContact.map((_contact, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Card elevation={2} key={index} style={{ marginBottom: 16 }}>
                      <Card.Content>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <IconButton icon="minus-circle" color="red" size={32} onPress={() => handleRemoveItem(index)} />
                          <View style={{ flex: 1 }}>
                            <List.Accordion title={`Kontakt #${index + 1}`}>
                              <Input
                                formikProps={formikProps}
                                formikKey={`emergencyContact.${index}.name`}
                                label="Nazwa kontaktu"
                                value={formikProps.values.emergencyContact[index].name}
                              />
                              <Input
                                formikProps={formikProps}
                                formikKey={`emergencyContact.${index}.number`}
                                keyboardType="phone-pad"
                                label="Numer telefonu"
                                value={formikProps.values.emergencyContact[index].number}
                              />
                            </List.Accordion>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  ))}
              </KeyboardAvoidView>
            </View>
            <Button
              disabled={pendingFetch || pendingUpdate}
              loading={pendingFetch || pendingUpdate}
              fetch
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

export default EmergencyContactScreen;
