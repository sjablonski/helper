import { StyleSheet } from 'react-native';

const baseStyles = {
  button: {
    borderRadius: 4,
    paddingVertical: 12,
  },
  icon: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'white',
  },
  textWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    marginHorizontal: 12,
    color: 'white',
  },
  spinner: {
    color: 'white',
  },
};

const primary = StyleSheet.create({
  ...baseStyles,
  button: {
    ...baseStyles.button,
    backgroundColor: '#34495e',
  },
});

const secondary = StyleSheet.create({
  ...baseStyles,
  button: {
    ...baseStyles.button,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#34495e',
  },
  text: {
    ...baseStyles.text,
    color: '#34495e',
  },
  icon: {
    ...baseStyles.icon,
    color: '#34495e',
  },
  spinner: {
    ...baseStyles.spinner,
    color: '#34495e',
  },
});

const success = StyleSheet.create({
  ...baseStyles,
  button: {
    ...baseStyles.button,
    backgroundColor: '#27ae60',
  },
});

const outline = StyleSheet.create({
  ...baseStyles,
  button: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#dfdfdf',
  },
  text: {
    ...baseStyles.text,
    color: 'black',
  },
  icon: {
    ...baseStyles.icon,
    color: 'black',
  },
  spinner: {
    ...baseStyles.spinner,
    color: 'black',
  },
});

const link = StyleSheet.create({});

export default color => {
  switch (color) {
    case 'primary':
      return primary;
    case 'secondary':
      return secondary;
    case 'success':
      return success;
    case 'outline':
      return outline;
    case 'link':
      return link;
    default:
      return primary;
  }
};
