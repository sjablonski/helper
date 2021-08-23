import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  camera: { flex: 1 },
  wrapper: { flex: 1 },
  sliderWrapper: {
    position: 'absolute',
    width: '100%',
    left: 148,
    bottom: 300,
  },
  slider: {
    transform: [{ rotate: '-90deg' }],
  },
  changeCamera: {
    alignSelf: 'flex-end',
    marginRight: 24,
  },
  snapButton: {
    alignSelf: 'center',
  },
  snapIcon: {
    color: 'white',
    fontSize: 96,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 12,
  },
});

export default styles;
