import * as Location from 'expo-location';
import { LOCATION } from 'expo-permissions';
import getPermissions from 'utils/getPermissions';

const getCurrentLocation = async callback => {
  const isPermission = await getPermissions(LOCATION);
  if (isPermission) {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    });
    callback(location);
  }
};

export default getCurrentLocation;
