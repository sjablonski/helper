import 'utils/fixTimerBug';

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import * as firebase from 'firebase';
import App from 'navigation/AppNavigator';
import store from 'store';
import firebaseConfig from 'api/firebase';
import theme from 'constants/theme';
import { setNavigator } from 'references/navigationRef';

firebase.initializeApp(firebaseConfig);

export default () => (
  <StoreProvider store={store}>
    <PaperProvider theme={theme}>
      <App ref={navigator => setNavigator(navigator)} />
    </PaperProvider>
  </StoreProvider>
);
