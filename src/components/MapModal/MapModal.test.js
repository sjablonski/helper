import React from 'react';

import { render } from '@testing-library/react-native';
import MapModal from './MapModal';

describe('Unit tests', () => {
  it(`MapModal props test`, () => {
    const ref = React.createRef();
    const tree = render(<MapModal ref={ref} location={{ coords: { latitude: 1, longitude: 1 } }} />).asJSON();
    expect(tree).toMatchSnapshot();
  });
});
