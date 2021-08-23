import React, { useEffect, useState } from 'react';
import { Button, FAB } from 'react-native-paper';
import Map from 'components/Map';
import Searchbar from 'components/Searchbar';
import getCurrentLocation from 'utils/getCurrentLocation';
import styles from './styles';

const LocationSelectionScreen = ({ navigation, location, addMarkerLocation }) => {
  const [newLocation, setNewLocation] = useState(null);
  const state = { isFollowing: false, marker: true };

  const handleSave = () => {
    if (newLocation) {
      addMarkerLocation(newLocation);
    } else {
      addMarkerLocation(location);
    }
    navigation.goBack();
  };

  const getLocation = () => {
    getCurrentLocation(addMarkerLocation);
  };

  useEffect(() => {
    if (location) setNewLocation(location);
  }, [location]);

  return (
    <Map location={newLocation} state={state} getLocation={getLocation} setLocation={setNewLocation}>
      <Searchbar
        icon={{ source: 'arrow-left', direction: 'auto' }}
        callback={addMarkerLocation}
        onIconPress={() => navigation.goBack()}
        placeholder="Wyszukaj lokalizację"
      />
      <FAB style={styles.fabGPS} icon="crosshairs-gps" onPress={getLocation} />
      {newLocation ? (
        <Button icon="plus" mode="contained" onPress={handleSave}>
          Zapisz lokalizację
        </Button>
      ) : (
        <Button mode="contained" onPress={getLocation}>
          Pobierz aktualną lokalizację
        </Button>
      )}
    </Map>
  );
};

export default LocationSelectionScreen;
