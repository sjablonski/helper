import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Container from './Container';

describe('Unit tests', () => {
  it(`Container props test`, () => {
    const { getByTestId } = render(
      <Container>
        <View />
      </Container>,
    );
    expect(getByTestId('wrapper').children[0].type).toBe('View');
  });
});
