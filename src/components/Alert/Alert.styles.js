import { StyleSheet } from 'react-native';

const baseStyles = {
  wrapper: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
};

const info = StyleSheet.create({
  ...baseStyles,
  wrapper: {
    ...baseStyles.wrapper,
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
  },
  text: {
    ...baseStyles.text,
    color: '#004085',
  },
});

const success = StyleSheet.create({
  ...baseStyles,
  wrapper: {
    ...baseStyles.wrapper,
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  text: {
    ...baseStyles.text,
    color: '#155724',
  },
});

const error = StyleSheet.create({
  ...baseStyles,
  wrapper: {
    ...baseStyles.wrapper,
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  text: {
    ...baseStyles.text,
    color: '#721c24',
  },
});

export default type => {
  switch (type) {
    case 'info':
      return info;
    case 'success':
      return success;
    case 'error':
      return error;
    default:
      return info;
  }
};
