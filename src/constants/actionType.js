import { createRequestActionType, createSuccessActionType, createFailureActionType } from 'utils/createLoadingActionType';

export const SIGN_IN_TYPE = 'SIGN_IN';
export const SIGN_IN_REQUEST = createRequestActionType(SIGN_IN_TYPE);
export const SIGN_IN_SUCCESS = createSuccessActionType(SIGN_IN_TYPE);
export const SIGN_IN_FAILURE = createFailureActionType(SIGN_IN_TYPE);

export const SIGN_UP_TYPE = 'SIGN_UP';
export const SIGN_UP_REQUEST = createRequestActionType(SIGN_UP_TYPE);
export const SIGN_UP_SUCCESS = createSuccessActionType(SIGN_UP_TYPE);
export const SIGN_UP_FAILURE = createFailureActionType(SIGN_UP_TYPE);

export const RESET_PASSWORD_TYPE = 'RESET_PASSWORD';
export const RESET_PASSWORD_REQUEST = createRequestActionType(RESET_PASSWORD_TYPE);
export const RESET_PASSWORD_SUCCESS = createSuccessActionType(RESET_PASSWORD_TYPE);
export const RESET_PASSWORD_FAILURE = createFailureActionType(RESET_PASSWORD_TYPE);

export const SIGN_OUT = 'SIGN_OUT';
export const ADD_ERROR = 'ADD_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const ADD_TO_GALLERY = 'ADD_TO_GALLERY';
export const REMOVE_FROM_GALLERY = 'REMOVE_FROM_GALLERY';
export const CLEAR_GALLERY = 'CLEAR_GALLERY';

export const ADD_CURRENT_LOCATION = 'ADD_CURRENT_LOCATION';
export const ADD_MARKER_LOCATION = 'ADD_MARKER_LOCATION';
export const CREATE_ENTRY = 'CREATE_ENTRY';

export const VERIFICATION_CODE = 'VERIFICATION_CODE';
export const VERIFICATION_CODE_REQUEST = createRequestActionType(VERIFICATION_CODE);
export const VERIFICATION_CODE_SUCCESS = createSuccessActionType(VERIFICATION_CODE);
export const VERIFICATION_CODE_FAILURE = createFailureActionType(VERIFICATION_CODE);

export const ADD_ENTRY = 'ADD_ENTRY';
export const ADD_ENTRY_REQUEST = createRequestActionType(ADD_ENTRY);
export const ADD_ENTRY_SUCCESS = createSuccessActionType(ADD_ENTRY);
export const ADD_ENTRY_FAILURE = createFailureActionType(ADD_ENTRY);

export const FETCH_ENTRIES = 'FETCH_ENTRIES';
export const FETCH_ENTRIES_REQUEST = createRequestActionType(FETCH_ENTRIES);
export const FETCH_ENTRIES_SUCCESS = createSuccessActionType(FETCH_ENTRIES);
export const FETCH_ENTRIES_FAILURE = createFailureActionType(FETCH_ENTRIES);

export const CANCEL_ENTRY = 'CANCEL_ENTRY';
export const CANCEL_ENTRY_REQUEST = createRequestActionType(CANCEL_ENTRY);
export const CANCEL_ENTRY_SUCCESS = createSuccessActionType(CANCEL_ENTRY);
export const CANCEL_ENTRY_FAILURE = createFailureActionType(CANCEL_ENTRY);

export const FETCH_ENTRY_DETAILS = 'FETCH_ENTRY_DETAILS';
export const FETCH_ENTRY_DETAILS_REQUEST = createRequestActionType(FETCH_ENTRY_DETAILS);
export const FETCH_ENTRY_DETAILS_SUCCESS = createSuccessActionType(FETCH_ENTRY_DETAILS);
export const FETCH_ENTRY_DETAILS_FAILURE = createFailureActionType(FETCH_ENTRY_DETAILS);

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_REQUEST = createRequestActionType(UPDATE_USER);
export const UPDATE_USER_SUCCESS = createSuccessActionType(UPDATE_USER);
export const UPDATE_USER_FAILURE = createFailureActionType(UPDATE_USER);

export const FETCH_MEDICALID = 'FETCH_MEDICALID';
export const FETCH_MEDICALID_REQUEST = createRequestActionType(FETCH_MEDICALID);
export const FETCH_MEDICALID_SUCCESS = createSuccessActionType(FETCH_MEDICALID);
export const FETCH_MEDICALID_FAILURE = createFailureActionType(FETCH_MEDICALID);

export const UPDATE_MEDICALID = 'UPDATE_MEDICALID';
export const UPDATE_MEDICALID_REQUEST = createRequestActionType(UPDATE_MEDICALID);
export const UPDATE_MEDICALID_SUCCESS = createSuccessActionType(UPDATE_MEDICALID);
export const UPDATE_MEDICALID_FAILURE = createFailureActionType(UPDATE_MEDICALID);

export const FETCH_EMERGENCY_CONTACT = 'FETCH_EMERGENCY_CONTACT';
export const FETCH_EMERGENCY_CONTACT_REQUEST = createRequestActionType(FETCH_EMERGENCY_CONTACT);
export const FETCH_EMERGENCY_CONTACT_SUCCESS = createSuccessActionType(FETCH_EMERGENCY_CONTACT);
export const FETCH_EMERGENCY_CONTACT_FAILURE = createFailureActionType(FETCH_EMERGENCY_CONTACT);

export const UPDATE_EMERGENCY_CONTACT = 'UPDATE_EMERGENCY_CONTACT';
export const UPDATE_EMERGENCY_CONTACT_REQUEST = createRequestActionType(UPDATE_EMERGENCY_CONTACT);
export const UPDATE_EMERGENCY_CONTACT_SUCCESS = createSuccessActionType(UPDATE_EMERGENCY_CONTACT);
export const UPDATE_EMERGENCY_CONTACT_FAILURE = createFailureActionType(UPDATE_EMERGENCY_CONTACT);

export const CLEAR_ENTRIES = 'CLEAR_ENTRIES';

export const FALL_DETECTED = 'FALL_DETECTED';
export const CANCEL_ALARM = 'CANCEL_ALARM';

export const UPDATE_ENTRIES = 'UPDATE_ENTRIES';
