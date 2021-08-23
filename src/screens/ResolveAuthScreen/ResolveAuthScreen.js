import { useEffect } from 'react';

const ResolveAuthScreen = ({ tryLocalSignIn }) => {
  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return null;
};

export default ResolveAuthScreen;
