import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import Input from 'components/Input';

const DatePicker = ({ formikProps, formikKey, label, ...props }) => {
  const [visible, setVisible] = useState(false);
  const { setFieldValue } = formikProps;

  const showPicker = () => {
    setVisible(true);
  };

  const handleDatePicked = (event, date) => {
    setVisible(Platform.OS === 'ios' ? true : false);
    if (event.type === 'set') {
      setFieldValue(formikKey, date.getTime());
    }
  };

  return (
    <>
      <TouchableOpacity onPress={showPicker}>
        <Input
          date
          editable={false}
          formikKey={formikKey}
          formikProps={formikProps}
          label={label}
          testID="label"
          pointerEvents="none"
        />
      </TouchableOpacity>
      {visible && <DateTimePicker onChange={handleDatePicked} {...props} />}
    </>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.instanceOf(Object).isRequired,
};

DatePicker.defaultProps = {
  label: 4,
};

export default DatePicker;
