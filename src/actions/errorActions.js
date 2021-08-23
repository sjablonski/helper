import { CLEAR_ERROR } from 'constants/actionType';

const addError = (actionName, message) => dispatch => {
  dispatch({ type: `${actionName}_FAILURE`, payload: message });
};

const clearError = actionName => dispatch => {
  dispatch({ type: CLEAR_ERROR, payload: actionName });
};

export { addError, clearError };
