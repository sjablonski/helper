import React from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import styles from './Container.styles';

const Container = ({ children, isKeyboard }) => {
  return (
    <SafeAreaView style={{ flex: 1 }} testID="wrapper">
      {isKeyboard ? (
        <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={Platform.OS === 'ios' ? 32 : 8}>
          <View style={styles.content}>{children}</View>
        </KeyboardAwareScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </SafeAreaView>
  );
};

Container.propTypes = {
  isKeyboard: PropTypes.bool,
};

Container.defaultProps = {
  isKeyboard: false,
};

export default Container;
