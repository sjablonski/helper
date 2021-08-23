import { useState, useEffect } from 'react';
import { LOCATION } from 'expo-permissions';
import { Accuracy, watchPositionAsync } from 'expo-location';
import getPermissions from 'utils/getPermissions';

export default (shouldTrack, callback) => {
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    const isPermission = await getPermissions(LOCATION);
    if (isPermission) {
      const sub = await watchPositionAsync(
        { accuracy: Accuracy.BestForNavigation, timeInterval: 1000, distanceInterval: 10 },
        callback,
      );
      setSubscriber(sub);
    }
  };

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) subscriber.remove();
      setSubscriber(null);
    }
  }, [shouldTrack]);
};
