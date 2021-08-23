import React from 'react';
import { render } from '@testing-library/react-native';
import Switch from './Switch';

describe('Unit tests', () => {
  it(`Switch props test`, () => {
    const onPressEvent = jest.fn();
    const { getByTestId } = render(<Switch text="Switch label" value={false} onValueChange={onPressEvent} />);
    expect(getByTestId('label').props.children).toBe('Switch label');
    expect(getByTestId('switch').props.value).toBe(false);
  });
});
