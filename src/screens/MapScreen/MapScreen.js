import React, { useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { Button, Colors, FAB } from 'react-native-paper';
import Map from 'components/Map';
import Searchbar from 'components/Searchbar';
import useWatchLocation from 'hooks/useWatchLocation';
import styles from './styles';

const MapScreen = ({ isFocused, navigation, location, addLocation }) => {
  const [state, setState] = useState({ isFollowing: true, marker: false });

  useWatchLocation(isFocused && state.isFollowing, addLocation);

  const handleMarker = () => {
    setState({ isFollowing: false, marker: true });
  };

  const handleGPS = () => {
    setState(prevState => ({ isFollowing: !prevState.isFollowing, marker: false }));
  };

  return (
    <Map state={state} setState={setState} location={location} setLocation={addLocation}>
      <Searchbar
        callback={addLocation}
        secondCallback={() => setState({ isFollowing: false, marker: true })}
        icon="menu"
        onIconPress={() => navigation.toggleDrawer()}
        placeholder="Wyszukaj lokalizację"
      />
      <FAB icon="map-marker-plus" onPress={handleMarker} style={styles.fabMarker} />
      <FAB
        icon="crosshairs-gps"
        onPress={handleGPS}
        color={state.isFollowing ? Colors.lightBlue800 : Colors.grey700}
        style={styles.fabGPS}
      />
      <Button icon="plus" mode="contained" onPress={() => navigation.navigate('EntryForm')}>
        Dodaj zgłoszenie
      </Button>
    </Map>
  );
};

export default withNavigationFocus(MapScreen);
