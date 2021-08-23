import React from 'react';
import { TextInput, View } from 'react-native';
import { Colors, IconButton, HelperText, TextInput as TextInputPaper } from 'react-native-paper';
import Spacer from 'components/Spacer';
import formatDate from 'utils/formatDate';
import styles from './Input.styles';

const InputWithSuffix = props => {
  const { suffix, style } = props;
  return (
    <View style={styles.wrapper}>
      <TextInput {...props} style={[...style, { flex: 1, textAlignVertical: 'center' }]} />
      {suffix && suffix.map(item => <IconButton key={item.icon} icon={item.icon} onPress={item.onPress} style={styles.icon} />)}
    </View>
  );
};

const Input = ({ formikKey, formikProps, date, ...rest }) => {
  if (formikKey && formikProps) {
    const { errors, touched, handleBlur, handleChange, values } = formikProps;
    const error = touched[formikKey] && errors[formikKey];
    const value =
      values[formikKey] instanceof Date || (date && values[formikKey])
        ? formatDate(values[formikKey], true)
        : values[formikKey];

    return (
      <Spacer>
        <TextInputPaper
          error={error}
          mode="flat"
          theme={{ colors: { primary: Colors.blueGrey800, background: 'transparent' } }}
          onBlur={handleBlur(formikKey)}
          onChangeText={handleChange(formikKey)}
          value={value}
          testID="input"
          {...rest}
          render={props => InputWithSuffix(props)}
        />
        {error && <HelperText type="error">{errors[formikKey]}</HelperText>}
      </Spacer>
    );
  }
  return (
    <Spacer>
      <TextInputPaper
        mode="flat"
        theme={{ colors: { primary: Colors.blueGrey800, background: 'transparent' } }}
        {...rest}
        render={props => InputWithSuffix(props)}
      />
    </Spacer>
  );
};

export default Input;
