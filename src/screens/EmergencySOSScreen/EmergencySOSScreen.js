import React, { useEffect, useRef, useState } from 'react';
import { Platform, Vibration, View } from 'react-native';
import { Appbar, Button, Caption } from 'react-native-paper';
import { Notifications } from 'expo';
import { fallDetectAlert } from 'constants/localNotification';
import Alert from 'components/Alert';
import Container from 'components/Container';
import Spacer from 'components/Spacer';
import Switch from 'components/Switch';
import Wrapper from 'components/Wrapper';
import useDeviceMotion from 'hooks/useDeviceMotion';
import useNavigationEvents from 'hooks/useNavigationEvents';
import round from 'utils/round';

if (Platform.OS === 'android') {
  Notifications.createChannelAndroidAsync('fallDetectorChannelAndroid', {
    name: 'Reminders',
    priority: 'max',
    vibrate: [0, 250, 250, 250],
    sound: true,
  });
}

Notifications.createCategoryAsync('fallDetectorAlert', [
  {
    actionId: 'cancel',
    buttonTitle: 'Nic mi nie jest',
    isDestructive: true,
    isAuthenticationRequired: false,
  },
]);

const EmergencySOSScreen = ({ navigation, error, location, phoneNumber, addDetectionFall, clearError }) => {
  const [switchValue, setSwitchValue] = useState(false);
  const [fall, setFall] = useState(false);
  const timerRef = useRef(null);
  let currentTime = 0;
  let endTime = 0;
  let thresholdValueDetect = false;

  const handleNavigation = () => {
    navigation.toggleDrawer();
  };

  const detect = ({ accelerationIncludingGravity: { x, y, z } }) => {
    const val = !x || !y || !z ? 0 : round(Math.sqrt(x ** 2 + y ** 2 + z ** 2));
    if (val > 25 && !fall) {
      thresholdValueDetect = true;
      endTime = new Date(currentTime + 3000);
    }
    if (thresholdValueDetect) {
      currentTime = new Date().getTime();
      const result = endTime - currentTime;
      if (result < 0) {
        if (Math.abs(x) > 5 && Math.abs(y) < 5 && !fall) {
          setFall(true);
        } else {
          thresholdValueDetect = false;
        }
      }
    }
  };

  const cancelTimer = () => {
    clearTimeout(timerRef.current);
    setFall(false);
  };

  useDeviceMotion(switchValue, detect);

  useEffect(() => {
    let subs;
    if (fall) {
      subs = Notifications.addListener(e => {
        if (e.actionId === 'cancel') {
          cancelTimer();
        }
      });

      Notifications.presentLocalNotificationAsync(fallDetectAlert);
      timerRef.current = setTimeout(() => {
        addDetectionFall({
          description: 'Wykryto upadek',
          location: JSON.stringify(location),
          reportType: 'Upadek',
          phoneNumber,
        });
      }, 30000);
      Vibration.vibrate(1000);
    }
    return () => {
      if (subs) subs.remove();
    };
  }, [fall]);

  useNavigationEvents('willBlur', () => {
    clearError();
  });

  return (
    <Wrapper>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={handleNavigation} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Alarmowe SOS" />
        <Appbar.Action />
      </Appbar.Header>
      <Container>
        <View style={{ marginHorizontal: 4 }}>
          <Spacer>{error ? <Alert type="error" message={error} /> : null}</Spacer>
          <Switch text="Wykrywanie upadku" onValueChange={setSwitchValue} value={switchValue} />
          <Caption>
            Helper może automatycznie wysyłać zgłoszenie, gdy upadniesz i nie wykryje ruchu. Przed wysłaniem zgłoszenia
            aplikacja wyświetli alert o wykryciu upadku. Jeżeli w ciągu 30 sek nie odpowiesz, aplikacja wyśle zgłoszenie do
            służb ratunkowych.
          </Caption>
          {fall ? <Button onPress={cancelTimer}>Nic mi nie jest</Button> : null}
          <Button onPress={() => navigation.navigate('MedicalID', { prevScreen: 'EmergencySOS' })}>Karta medyczna</Button>
          <Button
            onPress={() =>
              navigation.navigate('EmergencyContact', {
                prevScreen: 'EmergencySOS',
              })
            }
          >
            Kontakty alarmowe
          </Button>
        </View>
      </Container>
    </Wrapper>
  );
};

export default EmergencySOSScreen;
