import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    backgroundColor: 'transparent',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 32,
  },
  centralButton: {
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 16,
  },
  videoControl: { flexDirection: 'row', alignItems: 'center' },
  slider: {
    flex: 1,
  },
});

export default styles;
