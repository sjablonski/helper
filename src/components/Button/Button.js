import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import getStyleSheet from './Button.styles';

const Button = ({ isSubmitting, disabled, onPress, icon, title, color }) => {
  const styles = getStyleSheet(color);

  return (
    <TouchableOpacity disabled={isSubmitting || disabled} testID="button" onPress={onPress} style={styles.button}>
      <View style={styles.textWrapper}>
        {isSubmitting ? (
          <>
            <ActivityIndicator size="small" color={styles.spinner.color} />
            <Text style={styles.text}>Ładowanie...</Text>
          </>
        ) : (
          <>
            {icon ? <FontAwesome name={icon} style={styles.icon} /> : null}
            <Text style={styles.text} testID="title">
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  isSubmitting: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  isSubmitting: false,
  disabled: false,
  icon: '',
  color: 'primary',
};

export default Button;
