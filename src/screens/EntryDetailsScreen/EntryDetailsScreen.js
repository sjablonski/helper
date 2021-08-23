import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import Alert from 'components/Alert';
import Container from 'components/Container';
import Gallery from 'components/Gallery';
import Input from 'components/Input';
import MapModal from 'components/MapModal';
import Spacer from 'components/Spacer';
import Wrapper from 'components/Wrapper';
import formatDate from 'utils/formatDate';
import statusConversion from 'utils/statusConversion';
import reverseGeocode from 'utils/reverseGeocode';

const EntryDetailsScreen = ({ navigation, error, details, fetchEntryDetails, cancelSentEntry }) => {
  const modalRef = useRef(null);
  const [mapVisible, setMapVisible] = useState(true);
  const [address, setAddress] = useState(null);
  const {
    state: { params },
  } = navigation;

  useEffect(() => {
    fetchEntryDetails(params.id);
  }, []);

  const handleOpenMap = () => {
    setMapVisible(true);
    modalRef.current.open();
  };

  const handleReverseGeocode = async () => {
    const result = await reverseGeocode(details.location);
    setAddress(result);
  };

  useEffect(() => {
    if (details) {
      handleReverseGeocode();
    }
  }, [details]);

  if (!details) {
    return null;
  }

  const status = statusConversion(details.status);

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Szczegóły zgłoszenia" />
        <Appbar.Action />
      </Appbar.Header>
      <Container>
        <View style={{ flex: 1, marginBottom: 12 }}>
          <Card elevation={2}>
            <Card.Content>
              <ScrollView>
                {error ? <Alert type="error" message={error} /> : null}
                <Input editable={false} label="Rodzaj zgłoszenia" value={details.reportType} />
                <Input editable={false} label="Numer telefonu" value={details.phoneNumber} />
                <Input editable={false} label="Data utworzenia" value={formatDate(details.createdOn)} />
                <Input editable={false} label="Status" value={status.name} />
                <Input
                  editable={false}
                  label="Lokalizacja"
                  multiline
                  suffix={[{ icon: 'map-marker', onPress: () => handleOpenMap() }]}
                  value={address ? `${address.street || ''} ${address.name || ''}, ${address.city || ''}` : ''}
                />
                <Input editable={false} label="Opis" multiline value={details.description} />
                <Spacer>
                  <Gallery files={details.images} />
                </Spacer>
              </ScrollView>
            </Card.Content>
          </Card>
        </View>
        {details.status === 'pending' ? (
          <Spacer>
            <Button onPress={() => cancelSentEntry(params.id)}>Anuluj zgłoszenie</Button>
          </Spacer>
        ) : null}
      </Container>
      {mapVisible && <MapModal ref={modalRef} location={details.location} />}
    </Wrapper>
  );
};

export default EntryDetailsScreen;
