import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import Spacer from './Spacer';

describe('Unit tests', () => {
  it(`Spacer props test`, () => {
    const { getByType } = render(
      <Spacer>
        <View />
      </Spacer>,
    );
    expect(getByType(View).parent.type.name).toBe('Spacer');
  });
});
