import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Formik } from 'formik';
import CodeInput from './CodeInput';

describe('Unit tests', () => {
  it(`CodeInput props test`, () => {
    const { getByTestId } = render(
      <Formik initialValues={{ code: '' }}>
        {formikProps => <CodeInput formikKey="code" formikProps={formikProps} length={2} />}
      </Formik>,
    );

    const input1 = getByTestId('input1');
    fireEvent.changeText(input1, '1');
    const input2 = getByTestId('input2');
    fireEvent.changeText(input2, '2');
    expect(input1.props.value).toBe('1');
    expect(input2.props.value).toBe('2');
  });
});
