import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import styles from './Map.styles';

const Map = ({ location, state, setLocation, setState }) => {
  const [isMapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  const initRegion = {
    ...location.coords,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  const {
    coords: { latitude, longitude },
  } = location;
  const { isFollowing, marker } = state;

  const handleMapPress = () => {
    setState(prevState => ({ ...prevState, isFollowing: false }));
  };

  const handleDragEnd = e => {
    setLocation({ coords: { ...e.nativeEvent.coordinate } });
  };

  const onMapLayout = () => {
    setMapReady(true);
  };

  useEffect(() => {
    if (isMapReady) {
      if (isFollowing || marker) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    }
  }, [isMapReady, isFollowing, marker, location]);

  return (
    <MapView
      ref={mapRef}
      initialRegion={initRegion}
      loadingEnabled
      showsUserLocation
      showsMyLocationButton={false}
      style={styles.map}
      onPress={setState ? handleMapPress : null}
      onLayout={onMapLayout}
    >
      {marker && isMapReady ? (
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          onDragEnd={handleDragEnd}
          draggable
        />
      ) : null}
    </MapView>
  );
};

export default Map;
