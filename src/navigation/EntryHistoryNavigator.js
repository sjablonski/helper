import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import EntryHistoryScreen from 'screens/EntryHistoryScreen';
import EntryDetailsScreen from 'screens/EntryDetailsScreen';
import DrawerIcon from 'components/DrawerIcon';

export default createStackNavigator(
  {
    EntryHistory: EntryHistoryScreen,
    EntryDetails: EntryDetailsScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    navigationOptions: {
      title: 'Wysłane zgłoszenia',
      drawerIcon: ({ tintColor }) => <DrawerIcon name="list" color={tintColor} />,
    },
  },
);
