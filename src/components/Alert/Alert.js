import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import getStyleSheet from './Alert.styles';

const Alert = ({ type, message }) => {
  const styles = getStyleSheet(type);
  return (
    <View style={styles.wrapper} testID="view">
      <Text style={styles.text} testID="text">
        {message}
      </Text>
    </View>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
