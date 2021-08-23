import {
  SIGN_IN_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_OUT,
  UPDATE_USER_SUCCESS,
  FETCH_MEDICALID_SUCCESS,
  UPDATE_MEDICALID_SUCCESS,
  FETCH_EMERGENCY_CONTACT_SUCCESS,
  UPDATE_EMERGENCY_CONTACT_SUCCESS,
} from 'constants/actionType';

const initState = {
  email: null,
  phoneNumber: null,
  medicalID: {
    firstName: null,
    lastName: null,
    dateOfBirth: null,
    height: null,
    weight: null,
    bloodType: null,
    medicalConditions: null,
    allergies: null,
    medications: null,
  },
  emergencyContact: [],
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, email: action.payload.email, phoneNumber: action.payload.phoneNumber };
    case SIGN_OUT:
      return {};
    case FETCH_MEDICALID_SUCCESS:
    case UPDATE_MEDICALID_SUCCESS:
      return { ...state, medicalID: { ...state.medicalID, ...action.payload } };
    case FETCH_EMERGENCY_CONTACT_SUCCESS:
    case UPDATE_EMERGENCY_CONTACT_SUCCESS:
      return { ...state, emergencyContact: action.payload };
    default:
      return state;
  }
};

export default userReducer;
