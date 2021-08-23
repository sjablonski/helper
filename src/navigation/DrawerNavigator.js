import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import EntryHistoryNavigator from 'navigation/EntryHistoryNavigator';
import UserAccountNavigator from 'navigation/UserAccountNavigator';
import MapScreen from 'screens/MapScreen';
import EmergencySOSScreen from 'screens/EmergencySOSScreen';
import DrawerContent from 'components/DrawerContent';
import DrawerIcon from 'components/DrawerIcon';

export default createDrawerNavigator(
  {
    UserAccount: UserAccountNavigator,
    Map: {
      screen: MapScreen,
      navigationOptions: {
        title: 'Mapa',
        drawerIcon: ({ tintColor }) => <DrawerIcon name="map-o" color={tintColor} />,
      },
    },
    EntryHistory: EntryHistoryNavigator,
    EmergencySOS: {
      screen: EmergencySOSScreen,
      navigationOptions: {
        title: 'Alarmowe SOS',
        drawerIcon: ({ tintColor }) => <DrawerIcon name="exclamation-triangle" color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'Map',
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: '#DB2B38',
    },
    defaultNavigationOptions: {
      header: null,
    },
  },
);
