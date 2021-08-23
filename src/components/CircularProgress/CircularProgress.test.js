import React from 'react';
import { render } from '@testing-library/react-native';
import CircularProgress from './CircularProgress';

describe('Unit tests', () => {
  it(`CircularProgress props test`, () => {
    const { asJSON } = render(<CircularProgress percent={10} />);
    expect(asJSON().children[0].children[0].children[2].children[0].props.content).toBe('10%');
  });
});
