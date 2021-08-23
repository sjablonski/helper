import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backgroundLocationOff: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
