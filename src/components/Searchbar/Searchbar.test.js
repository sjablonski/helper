import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Searchbar from './Searchbar';

describe('Unit tests', () => {
  it(`Searchbar props test`, () => {
    const callback = jest.fn();
    const { getByTestId } = render(
      <Searchbar icon={{ source: 'arrow-left', direction: 'auto' }} callback={callback} placeholder="Wyszukaj lokalizację" />,
    );
    fireEvent.changeText(getByTestId('searchbar'), 'test');
    expect(getByTestId('searchbar').props.value).toBe('test');
  });
});
