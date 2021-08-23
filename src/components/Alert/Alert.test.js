import React from 'react';
import { render } from '@testing-library/react-native';
import Alert from './Alert';

describe('Unit tests', () => {
  it(`Alert props test`, () => {
    const { getByTestId } = render(<Alert type="error" message="Error" />);
    expect(getByTestId('text').props.children).toBe('Error');
    expect(getByTestId('view').props.style).toHaveProperty('backgroundColor', '#f8d7da');
  });
});
