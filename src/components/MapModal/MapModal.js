import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-native';
import { Appbar, Portal } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Wrapper from 'components/Wrapper';
import styles from './MapModal.styles';

const MapModal = forwardRef(({ location }, ref) => {
  const [visible, setVisible] = useState(false);

  const initRegion = {
    ...location.coords,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  const {
    coords: { latitude, longitude },
  } = location;

  useImperativeHandle(ref, () => ({
    close() {
      setVisible(false);
    },
    open() {
      setVisible(true);
    },
  }));

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <Portal>
      <Modal animationType="slide" visible={visible} onRequestClose={toggleModal}>
        <Wrapper>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => setVisible(false)} />
            <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Mapa" />
            <Appbar.Action />
          </Appbar.Header>
          <MapView initialRegion={initRegion} loadingEnabled showsMyLocationButton={false} style={styles.map} testID="map">
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
            />
          </MapView>
        </Wrapper>
      </Modal>
    </Portal>
  );
});

export default MapModal;
