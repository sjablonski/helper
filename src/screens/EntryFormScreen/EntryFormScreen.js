import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { Formik } from 'formik';
import Alert from 'components/Alert';
import Gallery from 'components/Gallery';
import Input from 'components/Input';
import ListPicker from 'components/ListPicker';
import KeyboardAvoidView from 'components/KeyboardAvoidView';
import Spacer from 'components/Spacer';
import VerificationModal from 'components/VerificationModal';
import Wrapper from 'components/Wrapper';
import validationSchema from 'utils/validationSchema';
import pickImage from 'utils/pickImage';
import getCurrentLocation from 'utils/getCurrentLocation';
import useClear from 'hooks/useClear';
import useNavigationEvents from 'hooks/useNavigationEvents';
import Container from 'components/Container';
import entryType from 'constants/entryType';

const EntryFormScreen = ({
  navigation,
  error,
  pending,
  locationEvent,
  galleryFiles,
  phoneNumber,
  addLocation,
  addToGallery,
  removeFromGallery,
  clearGallery,
  clearError,
}) => {
  const formikRef = useRef(null);
  const modalRef = useRef(null);
  const [verification, setVerification] = useState(false);
  const [values, setValues] = useState(null);
  const [pendingVerif, setPendingVerif] = useState(false);
  const { address, location } = locationEvent;
  const { goBack, navigate } = navigation;
  const initValues = {
    reportType: '',
    phoneNumber: phoneNumber || '',
    location: '',
    description: '',
  };
  const fetchSchema = validationSchema(['reportType', 'phoneNumber', 'location', 'description']);

  const callback = code => {
    setPendingVerif(true);
    try {
      modalRef.current.addError(null);
      if (code === '123456') {
        modalRef.current.close();
        navigation.navigate('UploadProgress', { ...values, files: galleryFiles });
      } else {
        throw Error('Błędny kod');
      }
    } catch (err) {
      modalRef.current.addError(err);
    }
    setPendingVerif(false);
  };

  const onSubmit = val => {
    setVerification(true);
    setValues(val);
    modalRef.current.open();
  };

  useClear(clearGallery);
  useNavigationEvents('willBlur', () => {
    clearError();
  });

  useEffect(() => {
    if (locationEvent) {
      formikRef.current.setFieldValue('location', location);
    }
  }, [locationEvent]);

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Nowe zgłoszenie" />
        <Appbar.Action />
      </Appbar.Header>
      <Container>
        <View style={{ flex: 1, marginBottom: 12 }}>
          <Card elevation={2}>
            <Card.Content>
              <Formik ref={formikRef} initialValues={initValues} validationSchema={fetchSchema} onSubmit={onSubmit}>
                {formikProps => (
                  <KeyboardAvoidView>
                    {error ? <Alert type="error" message={error} /> : null}
                    <ListPicker formikKey="reportType" formikProps={formikProps} data={entryType} label="Rodzaj zgłoszenia" />
                    <Input formikKey="phoneNumber" formikProps={formikProps} keyboardType="phone-pad" label="Numer telefonu" />
                    <Input
                      formikKey="location"
                      formikProps={formikProps}
                      editable={false}
                      label="Lokalizacja"
                      multiline
                      suffix={[
                        { icon: 'crosshairs-gps', onPress: () => getCurrentLocation(addLocation) },
                        { icon: 'map-marker-plus', onPress: () => navigate('LocationSelection') },
                      ]}
                      value={address ? `${address.street || ''} ${address.name || ''}, ${address.city || ''}` : ''}
                    />
                    <Input
                      formikKey="description"
                      formikProps={formikProps}
                      label="Opis"
                      maxLength={120}
                      multiline
                      numberOfLines={3}
                    />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 1, marginRight: 4 }}>
                        <Spacer>
                          <Button icon="camera" mode="outlined" uppercase={false} onPress={() => navigation.navigate('Camera')}>
                            Zdjęcie
                          </Button>
                        </Spacer>
                      </View>
                      <View style={{ flex: 1, marginLeft: 4 }}>
                        <Spacer>
                          <Button
                            disabled={galleryFiles.length >= 3}
                            icon="image-plus"
                            mode="outlined"
                            uppercase={false}
                            onPress={() => pickImage(addToGallery)}
                          >
                            Galeria
                          </Button>
                        </Spacer>
                      </View>
                    </View>
                    <Gallery files={galleryFiles} icon="delete-forever" action={removeFromGallery} />
                  </KeyboardAvoidView>
                )}
              </Formik>
            </Card.Content>
          </Card>
        </View>
        <Button disabled={pending} loading={pending} mode="contained" onPress={() => formikRef.current.handleSubmit()}>
          Wyślij zgłoszenie
        </Button>
      </Container>
      {verification && <VerificationModal ref={modalRef} pending={pendingVerif} onSubmit={callback} />}
    </Wrapper>
  );
};

export default EntryFormScreen;
