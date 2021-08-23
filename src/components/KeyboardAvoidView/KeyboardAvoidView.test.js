import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import KeyboardAvoidView from './KeyboardAvoidView';

describe('Unit tests', () => {
  it(`KeyboardAvoidView props test`, () => {
    const { getByTestId } = render(
      <KeyboardAvoidView>
        <View />
      </KeyboardAvoidView>,
    );
    expect(getByTestId('wrapper').children[0].type).toBe('View');
  });
});
