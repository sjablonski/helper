import { ADD_CURRENT_LOCATION, ADD_MARKER_LOCATION } from 'constants/actionType';

const initState = {
  currentLocation: { location: '', address: null },
  locationEvent: { location: '', address: null },
};

const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: { location: action.payload.location, address: action.payload.address },
        locationEvent: { location: action.payload.location, address: action.payload.address },
      };
    case ADD_MARKER_LOCATION:
      return {
        ...state,
        locationEvent: { location: action.payload.location, address: action.payload.address },
      };
    default:
      return state;
  }
};

export default locationReducer;
