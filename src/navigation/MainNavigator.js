import { createStackNavigator } from "react-navigation-stack";
import DrawerNavigator from "navigation/DrawerNavigator";
import LocationSelectionScreen from "screens/LocationSelectionScreen";
import EntryFormScreen from "screens/EntryFormScreen";
import CameraScreen from "screens/CameraScreen";
import GalleryScreen from "screens/GalleryScreen";
import UploadProgressScreen from "screens/UploadProgressScreen";

export default createStackNavigator(
  {
    Drawer: DrawerNavigator,
    EntryForm: EntryFormScreen,
    LocationSelection: LocationSelectionScreen,
    Camera: CameraScreen,
    Gallery: GalleryScreen,
    UploadProgress: UploadProgressScreen
  },
  {
    initialRouteName: "Drawer",
    defaultNavigationOptions: { header: null }
  }
);
