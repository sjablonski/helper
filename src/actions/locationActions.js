import { ADD_CURRENT_LOCATION, ADD_MARKER_LOCATION } from 'constants/actionType';
import reverseGeocode from 'utils/reverseGeocode';

const addLocation = location => async dispatch => {
  const address = await reverseGeocode(location);
  dispatch({ type: ADD_CURRENT_LOCATION, payload: { location, address } });
};

const addMarkerLocation = location => async dispatch => {
  const address = await reverseGeocode(location);
  dispatch({ type: ADD_MARKER_LOCATION, payload: { location, address } });
};

export { addLocation, addMarkerLocation };
