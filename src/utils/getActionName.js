const getActionName = actionType => {
  if (typeof actionType !== 'string') {
    return null;
  }

  return actionType
    .split('_')
    .slice(0, -1)
    .join('_');
};

export default getActionName;
