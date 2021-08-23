import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginNavigator from "navigation/LoginNavigator";
import MainNavigator from "navigation/MainNavigator";
import ResolveAuthScreen from "screens/ResolveAuthScreen";

export default createAppContainer(createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    Login: LoginNavigator,
    Main: MainNavigator
  }));