import getActionName from 'utils/getActionName';

const pendingReducer = (state = {}, action) => {
  const { type } = action;
  const actionName = getActionName(type);

  if (!actionName) return state;

  switch (type) {
    case actionName.concat('_REQUEST'):
      return { ...state, [actionName]: { pending: true } };
    case actionName.concat('_SUCCESS'):
    case actionName.concat('_FAILURE'):
      return { ...state, [actionName]: { pending: false } };
    default:
      return state;
  }
};

export const getPending = (state, actionName) => (state[actionName] ? state[actionName].pending : false);

export default pendingReducer;
