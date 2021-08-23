import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import UserAccountScreen from 'screens/UserAccountScreen';
import EmergencyContactScreen from 'screens/EmergencyContactScreen';
import MedicalIDScreen from 'screens/MedicalIDScreen';
import DrawerIcon from 'components/DrawerIcon';

export default createStackNavigator(
  {
    UserAccount: UserAccountScreen,
    EmergencyContact: EmergencyContactScreen,
    MedicalID: MedicalIDScreen,
  },
  {
    initialRouteName: 'UserAccount',
    defaultNavigationOptions: {
      header: null,
    },
    navigationOptions: {
      title: 'Profil użytkownika',
      drawerIcon: ({ tintColor }) => <DrawerIcon name="user" color={tintColor} />,
    },
  },
);
