import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from './Button';

describe('Unit tests', () => {
  it(`Button props test`, () => {
    const onPressEvent = jest.fn();
    const { getByTestId } = render(<Button onPress={onPressEvent} title="Press me" />);
    expect(getByTestId('title').props.children).toBe('Press me');
    const button = getByTestId('button');
    fireEvent.press(button);
    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});
