const createLoadingActionType = suffix => {
  return actionName => {
    return `${actionName}_${suffix}`;
  };
};

const createRequestActionType = createLoadingActionType('REQUEST');
const createSuccessActionType = createLoadingActionType('SUCCESS');
const createFailureActionType = createLoadingActionType('FAILURE');

export { createRequestActionType, createSuccessActionType, createFailureActionType };
