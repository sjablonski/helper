import React from 'react';
import { render } from '@testing-library/react-native';
import { Formik } from 'formik';
import ListPicker from './ListPicker';

const mockData = [
  {
    label: 'id1',
    value: 'id1',
  },
  {
    label: 'id2',
    value: 'id2',
  },
  {
    label: 'id3',
    value: 'id3',
  },
];

describe('Unit tests', () => {
  it('ListPicker props test', () => {
    const { getAllByTestId } = render(
      <Formik initialValues={{ mockData: '' }}>
        {formikProps => <ListPicker formikKey="mockData" formikProps={formikProps} data={mockData} label="Rodzaj zgłoszenia" />}
      </Formik>,
    );

    expect(getAllByTestId('flatList').length).toBe(1);
    expect(getAllByTestId('item').length).toBe(mockData.length);
  });
});
