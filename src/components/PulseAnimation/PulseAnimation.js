import React, { useState, useEffect } from 'react';
import { Animated, Easing, View } from 'react-native';
import getStyles from './PulseAnimation.styles';

const PulseAnimation = ({ color, interval, pulseMaxSize, size }) => {
  const [shadowAnim] = useState([new Animated.Value(0), new Animated.Value(0)]);
  const styles = getStyles(color, size);

  useEffect(() => {
    Animated.stagger(1000, [
      ...shadowAnim.map((_value, index, shadowAnim) => {
        return Animated.loop(
          Animated.timing(shadowAnim[index], {
            toValue: 1,
            duration: interval,
            easing: Easing.in,
          }),
        );
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.wrapper}>
      {shadowAnim.map((_value, index, shadowAnim) => (
        <Animated.View
          key={index}
          style={[
            styles.circle,
            {
              width: shadowAnim[index].interpolate({
                inputRange: [0, 1],
                outputRange: [size, pulseMaxSize],
              }),
              height: shadowAnim[index].interpolate({
                inputRange: [0, 1],
                outputRange: [size, pulseMaxSize],
              }),
              borderRadius: pulseMaxSize / 2,
              opacity: shadowAnim[index].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        />
      ))}
    </View>
  );
};

export default PulseAnimation;
