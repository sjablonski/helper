import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  notBlurred: { ...StyleSheet.absoluteFill },
  content: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    margin: 12,
    borderRadius: 4,
    padding: 8,
  },
  buttonContent: {
    backgroundColor: '#ecf0f1',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 4,
  },
  header: {
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: '500',
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: '#A6b6b7',
  },
  item: {
    padding: 16,
  },
  selectedItem: {
    backgroundColor: '#dbe0e0',
    color: '#2980b9',
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 12,
    fontSize: 20,
    color: 'blue',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'blue',
  },
  error: {
    color: 'red',
    marginLeft: 12,
  },
});

export default styles;
