import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { TextInput as TextInputPaper } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from './CodeInput.styles';

const CodeInput = ({ length, formikKey, formikProps }) => {
  const { setFieldValue, values } = formikProps;
  const [code, setCode] = useState(values[formikKey].split(''));
  const inputRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    inputRef.current[currentIndex].focus();
  }, [currentIndex]);

  const onChange = (index, value) => {
    const newArr = [...code];
    newArr[index] = value;
    setCode(newArr);
    setFieldValue(formikKey, newArr.join('').toString());
    if (newArr[index] && index < length - 1) setCurrentIndex(index + 1);
  };

  const onFocus = index => {
    setCurrentIndex(index);
  };

  const onKeyPress = (index, e) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (index === 0) {
        return;
      }
      const newArr = [...code];
      if (newArr[index]) {
        newArr[index] = '';
      } else {
        newArr[index - 1] = '';
      }
      setCurrentIndex(index - 1);
      setCode(newArr);
    }
  };

  const renderInput = () => {
    const inputArray = [];
    for (let i = 0; i < length; i += 1) {
      inputArray.push(
        <TextInputPaper
          key={i}
          keyboardType="number-pad"
          onChangeText={value => onChange(i, value)}
          onFocus={e => onFocus(i, e)}
          onKeyPress={e => onKeyPress(i, e)}
          testID={`input${i + 1}`}
          maxLength={1}
          mode="outlined"
          ref={ref => {
            inputRef.current.push(ref);
          }}
          selectTextOnFocus
          style={styles.input}
          value={code[i]}
          render={props => <TextInput {...props} style={[...props.style, styles.inputContent]} />}
        />,
      );
    }
    return inputArray;
  };

  return <View style={styles.wrapper}>{renderInput()}</View>;
};

CodeInput.propTypes = {
  length: PropTypes.number,
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.instanceOf(Object).isRequired,
};

CodeInput.defaultProps = {
  length: 4,
};

export default CodeInput;
