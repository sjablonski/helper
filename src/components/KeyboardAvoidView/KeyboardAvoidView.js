import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoidView = ({ children }) => (
  <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={Platform.OS === 'ios' ? 32 : 8} testID="wrapper">
    {children}
  </KeyboardAwareScrollView>
);

export default KeyboardAvoidView;
