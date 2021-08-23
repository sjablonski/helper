import React from 'react';
import { ImageBackground, View } from 'react-native';
import image from 'assets/background.png';
import styles from './Background.styles';

const Background = () => {
  return <ImageBackground source={image} style={styles.background} />;
};

export default Background;
