import { useContext, useEffect } from 'react';
import { NavigationContext } from 'react-navigation';

export default (eventName, event) => {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    const listener = navigation.addListener(eventName, event);
    return () => listener.remove();
  }, []);
};
