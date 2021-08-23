import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  iconWrapper: { alignSelf: 'center' },
  icon: {
    color: Colors.blueGrey800,
  },
  container: { flex: 1, paddingHorizontal: 32, marginVertical: 32 },
  description: { textAlign: 'center' },
});

export default styles;
