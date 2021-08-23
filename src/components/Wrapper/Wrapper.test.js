import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import Wrapper from './Wrapper';

describe('Unit tests', () => {
  it(`Wrapper props test`, () => {
    const { getByType } = render(
      <Wrapper>
        <View />
      </Wrapper>,
    );
    expect(getByType(View).parent.type.name).toBe('Wrapper');
  });
});
