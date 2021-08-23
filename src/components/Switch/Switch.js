import React from 'react';
import { View } from 'react-native';
import { Colors, Paragraph, Switch as SwitchPaper } from 'react-native-paper';
import styles from './Switch.styles';

const Switch = ({ text, value, onValueChange }) => {
  return (
    <View style={styles.row}>
      <Paragraph testID="label">{text}</Paragraph>
      <SwitchPaper color={Colors.green400} onValueChange={onValueChange} value={value} testID="switch" />
    </View>
  );
};

export default Switch;
