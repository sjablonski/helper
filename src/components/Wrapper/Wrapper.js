import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-paper';

const Wrapper = ({ children, theme }) => {
  const { colors } = theme;
  return <View style={{ flex: 1, backgroundColor: colors.background }}>{children}</View>;
};

export default withTheme(Wrapper);
