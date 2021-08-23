import React from 'react';
import { render } from '@testing-library/react-native';
import Gallery from './Gallery';

const mockData = [
  {
    uri: 'id-1',
  },
  {
    uri: 'id-2',
  },
  {
    uri: 'id-3',
  },
];

describe('Unit tests', () => {
  it('Gallery props test', () => {
    const { getAllByTestId } = render(
      <Gallery navigation={{ navigate: () => {} }} files={mockData} icon="test" action={() => {}} />,
    );

    expect(getAllByTestId('flatList').length).toBe(1);
    expect(getAllByTestId('item').length).toBe(mockData.length);
  });
});
