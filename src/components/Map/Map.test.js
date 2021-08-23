import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Map from './MapWrapper';

describe('Unit tests', () => {
  it(`Map props test`, () => {
    const { getByTestId } = render(
      <Map>
        <View />
      </Map>,
    );
    expect(getByTestId('container').children[0].type).toBe('View');
  });
});
