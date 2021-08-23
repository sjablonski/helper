import { Alert, Linking } from 'react-native';
import { askAsync } from 'expo-permissions';

const getPermissions = async (...arg) => {
  const { status } = await askAsync(...arg);
  switch (status) {
    case 'granted':
      return true;
    case 'denied':
      Alert.alert('Dostęp do zdjęć', 'Brak dos†ępu do zdjęć', [
        { text: 'Zmień ustawienia', onPress: () => Linking.openURL('app-settings:') },
        { text: 'OK' },
      ]);
      return false;
    default:
      return false;
  }
};

export default getPermissions;
