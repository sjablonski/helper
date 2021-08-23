import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-paper';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import styles from './DrawerContent.styles';

const DrawerContent = props => {
  const { signOut } = props;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: StatusBar.currentHeight }} />
      <View style={styles.body}>
        <ScrollView>
          <DrawerNavigatorItems {...props} />
        </ScrollView>
      </View>
      <View>
        <Button mode="outlined" onPress={signOut}>
          Wyloguj
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
