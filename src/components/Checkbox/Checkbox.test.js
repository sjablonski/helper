import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react-native';
import { Formik } from 'formik';
import Checkbox from './Checkbox';

describe('Unit tests', () => {
  it(`Checkbox props test`, async () => {
    const { getByTestId, queryByTestId } = render(
      <Formik initialValues={{ checkbox: true }}>
        {formikProps => <Checkbox formikKey="checkbox" formikProps={formikProps} label="Checkbox label" />}
      </Formik>,
    );
    const checkbox = getByTestId('checkbox');
    expect(getByTestId('label').props.children).toBe('Checkbox label');
    fireEvent.press(checkbox);
    await wait(() => expect(queryByTestId('checkboxFalse')).toBeTruthy());
    fireEvent.press(checkbox);
    await wait(() => expect(queryByTestId('checkboxTrue')).toBeTruthy());
  });
});
