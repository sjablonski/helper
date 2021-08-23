import { useEffect, useState } from 'react';
import { DeviceMotion } from 'expo-sensors';
import { NOTIFICATIONS } from 'expo-permissions';
import getPermissions from 'utils/getPermissions';

export default (switchValue, callback) => {
  const [subscriber, setSubscriber] = useState(null);

  const subscribe = async () => {
    const isPermission = await getPermissions(NOTIFICATIONS);
    if (isPermission) {
      const sub = DeviceMotion.addListener(data => callback(data));
      DeviceMotion.setUpdateInterval(16);
      setSubscriber(sub);
    }
  };

  const unsubscribe = () => {
    if (subscriber) {
      subscriber.remove();
    }
    setSubscriber(null);
  };

  useEffect(() => {
    if (switchValue) {
      subscribe();
    } else {
      unsubscribe();
    }
  }, [switchValue]);
};
