import { StyleSheet } from 'react-native';
import Color from 'color';

const baseStyles = {
  wrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderWidth: 2,
    position: 'absolute',
  },
};

export default (color, maxSize) => {
  const styles = StyleSheet.create({
    ...baseStyles,
    wrapper: {
      ...baseStyles.wrapper,
      width: maxSize,
      height: maxSize,
      marginTop: -maxSize / 2,
      marginLeft: -maxSize / 2,
    },
    circle: {
      ...baseStyles.circle,
      backgroundColor: color,
      borderColor: Color(color).darken(0.2),
    },
  });
  return styles;
};
