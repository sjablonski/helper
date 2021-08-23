import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import ResetPasswordScreen from 'screens/ResetPasswordScreen';

export default createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPassword: ResetPasswordScreen,
  },
  { initialRouteName: 'SignIn', defaultNavigationOptions: { header: null }, mode: 'modal' },
);
