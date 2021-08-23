import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, Button, Caption, Colors, Headline, withTheme } from 'react-native-paper';
import CircularProgress from 'components/CircularProgress';
import Container from 'components/Container';
import PulseAnimation from 'components/PulseAnimation';
import Wrapper from 'components/Wrapper';

const UploadProgressScreen = ({ navigation, theme, isSuccess, addEntry }) => {
  const {
    state: { params },
  } = navigation;
  const [progress, setProgress] = useState(0);
  const numberOfFiles = params.files.length;
  const percent = [];

  const getProgress = (index, snap) => {
    percent[index] = Math.floor((snap.bytesTransferred / snap.totalBytes) * 100);
    const sum = percent.reduce((previousValue, currentValue) => previousValue + currentValue);
    setProgress(Math.floor(sum / numberOfFiles));
  };

  const handleNavigation = () => {
    if (isSuccess) {
      navigation.popToTop();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    addEntry(params, getProgress);
  }, []);

  const newTheme = isSuccess ? { colors: { primary: Colors.green600 } } : theme;

  return (
    <Wrapper>
      <Appbar.Header theme={newTheme}>
        <Appbar.BackAction onPress={handleNavigation} />
        <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Wysyłanie" />
        <Appbar.Action />
      </Appbar.Header>
      <Container>
        {isSuccess ? (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Headline>Sukces</Headline>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <PulseAnimation color={Colors.green400} interval={2000} pulseMaxSize={256} size={64} />
              <Avatar.Icon
                theme={{ colors: { primary: Colors.green600 } }}
                color={theme.colors.background}
                size={128}
                icon="check"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Caption style={{ textAlign: 'center' }}>Dziękujemy! Zgłoszenie zostanie wkrótce rozpatrzone</Caption>
            </View>
            <Button theme={newTheme} mode="contained" onPress={handleNavigation}>
              Potwiedź
            </Button>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Headline>Trwa wysyłanie...</Headline>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress percent={progress} />
            </View>
            <View style={{ flex: 1 }}>
              <Caption style={{ textAlign: 'center' }}>Prosimy o cierpliwość, trwa przesyłane danych do serwera.</Caption>
            </View>
          </View>
        )}
      </Container>
    </Wrapper>
  );
};

export default withTheme(UploadProgressScreen);
