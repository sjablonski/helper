import React from 'react';
import { render } from '@testing-library/react-native';
import DrawerIcon from './DrawerIcon';

describe('Unit tests', () => {
  it(`DrawerIcon props test`, () => {
    const { container } = render(<DrawerIcon name="plus-circle" color="#f8d7da" />);
    expect(container.props.children.props.color).toBe('#f8d7da');
  });
});
