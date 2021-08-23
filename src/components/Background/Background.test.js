import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import Background from './Background';

describe('Unit tests', () => {
  it(`Background props test`, () => {
    const { getByType } = render(
      <Background />
    );
    expect(getByType(View).parent.type.name).toBe('ImageBackground');
  });
});
