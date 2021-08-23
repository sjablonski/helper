import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({ children, horizontal, size }) => {
  return <View style={[horizontal ? { marginHorizontal: size } : { marginVertical: size }]}>{children}</View>;
};

Spacer.propTypes = {
  horizontal: PropTypes.bool,
  size: PropTypes.number,
};

Spacer.defaultProps = {
  horizontal: false,
  size: 12,
};

export default Spacer;
