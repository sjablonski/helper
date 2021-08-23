import * as Location from 'expo-location';

export default async location => {
  const address = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  return address[0];
};
