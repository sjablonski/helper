import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import { Colors } from 'react-native-paper';
import PulseAnimation from './PulseAnimation';

describe('Unit tests', () => {
  it(`PulseAnimation props test`, () => {
    const { getAllByType } = render(<PulseAnimation color={Colors.green400} interval={2000} pulseMaxSize={256} size={64} />);
    expect(getAllByType(View)[0].props.style).toHaveProperty('width', 64);
    expect(getAllByType(View)[0].props.style).toHaveProperty('height', 64);
    expect(getAllByType(View)[1].props.style).toHaveProperty('backgroundColor', Colors.green400);
  });
});
