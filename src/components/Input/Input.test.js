import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Formik } from 'formik';
import Input from './Input';

describe('Unit tests', () => {
  it(`Input props test`, () => {
    const { getByTestId } = render(
      <Formik initialValues={{ code: '' }}>
        {formikProps => <Input formikKey="code" formikProps={formikProps} length={2} />}
      </Formik>,
    );

    const input = getByTestId('input');
    fireEvent.changeText(input, 'Input test');
    expect(input.props.value).toBe('Input test');
  });
});
