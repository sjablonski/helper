import React from 'react';
import { render } from '@testing-library/react-native';
import { Subheading } from 'react-native-paper';
import { Formik } from 'formik';
import Modal from './Modal';

describe('Unit tests', () => {
  it(`Modal props test`, () => {
    const ref = React.createRef();
    const { getByTestId } = render(
      <Formik initialValues={{ test: '' }}>
        {formikProps => (
          <Modal ref={ref} formikProps={formikProps} formikKey="test" label="Label">
            <Subheading>Heading</Subheading>
          </Modal>
        )}
      </Formik>,
    );
    expect(getByTestId('content').children[0].type).toBe('Text');
  });
});
