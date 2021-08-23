import React from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Colors, IconButton } from 'react-native-paper';
import Map from './Map';
import styles from './Map.styles';

const MapWrapper = ({ children, location, state, getLocation, setLocation, setState }) => {
  return (
    <View style={styles.wrapper}>
      {Platform.OS === 'android' ? <View style={{ paddingTop: 20 }} /> : null}
      {location ? (
        <Map location={location} state={state} setLocation={setLocation} setState={setState} />
      ) : (
        <View style={styles.backgroundLocationOff}>
          <IconButton color={Colors.grey700} icon="map-marker-off" size={120} onPress={getLocation} />
        </View>
      )}
      <SafeAreaView style={styles.wrapper}>
        <SafeAreaView style={styles.container} testID="container">
          {children}
        </SafeAreaView>
      </SafeAreaView>
    </View>
  );
};

export default MapWrapper;
