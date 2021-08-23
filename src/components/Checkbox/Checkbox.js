import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import styles from './Checkbox.styles';

const Checkbox = ({ label, formikKey, formikProps }) => {
  const { errors, touched, setFieldValue, values } = formikProps;
  return (
    <View>
      <View style={styles.wrapper}>
        <TouchableOpacity testID="checkbox" onPress={() => setFieldValue(formikKey, !values[formikKey])}>
          <View style={styles.wrapperLabel}>
            {values[formikKey] ? (
              <FontAwesome name="check-square" testID="checkboxTrue" style={styles.icon} />
            ) : (
              <FontAwesome name="square-o" testID="checkboxFalse" style={styles.icon} />
            )}
            <Text style={styles.label} testID="label">
              {label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {touched[formikKey] && errors[formikKey] && <Text style={styles.errorMsg}>{errors[formikKey]}</Text>}
    </View>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.instanceOf(Object).isRequired,
};

export default Checkbox;
