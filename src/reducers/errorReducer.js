import { CLEAR_ERROR } from 'constants/actionType';
import getActionName from 'utils/getActionName';

const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const actionName = getActionName(type);

  if (!actionName) return state;

  switch (type) {
    case actionName.concat('_FAILURE'): {
      let error;
      if (payload.response) {
        error = payload.response.data.message;
      } else if (payload.request) {
        error = 'Nie można połączyć się z serwerem.';
      } else {
        error = payload.toString();
      }
      return { ...state, [actionName]: { error } };
    }
    case CLEAR_ERROR:
      return { ...state, [payload]: { error: '' } };
    default:
      return state;
  }
};

export const getError = (state, actionName) => (state[actionName] ? state[actionName].error : '');

export default errorReducer;
