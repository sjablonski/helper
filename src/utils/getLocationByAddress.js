import * as Location from 'expo-location';
import { LOCATION } from 'expo-permissions';
import getPermissions from 'utils/getPermissions';

const getLocationByAddress = async (query, callback) => {
  const isPermission = await getPermissions(LOCATION);
  if (isPermission) {
    const address = await Location.geocodeAsync(query);
    callback({ coords: { ...address[0] } });
  }
};

export default getLocationByAddress;
