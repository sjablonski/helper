import React from 'react';
import renderer from 'react-test-renderer';
import VerificationModal from './VerificationModal';

describe('Unit tests', () => {
  it(`VerificationModal props test`, () => {
    const onPressEvent = jest.fn();
    const ref = React.createRef();
    const tree = renderer.create(<VerificationModal ref={ref} pending={false} onSubmit={onPressEvent} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
