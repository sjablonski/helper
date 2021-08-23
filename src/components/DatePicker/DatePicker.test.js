import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import DatePicker from './DatePicker';

describe('Unit tests', () => {
  it(`DatePicker props test`, () => {
    const tree = renderer
      .create(
        <Formik initialValues={{ date: '' }}>
          {formikProps => (
            <DatePicker
              formikProps={formikProps}
              formikKey="dateOfDirth"
              label="Data urodzenia"
              cancelTextIOS="Powrót"
              confirmTextIOS="Potwierdź"
              maximumDate={new Date()}
              mode="date"
              titleIOS="Data urodzenia"
            />
          )}
        </Formik>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
