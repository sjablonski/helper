import * as ImagePicker from 'expo-image-picker';
import { CAMERA_ROLL } from 'expo-permissions';
import getPermissions from 'utils/getPermissions';

const pickImage = async callback => {
  const isPermission = await getPermissions(CAMERA_ROLL);
  if (isPermission) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      callback(result);
    }
  }
};

export default pickImage;
