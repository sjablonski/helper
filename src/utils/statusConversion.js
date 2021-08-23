import statusType from 'constants/statusType';

const statusConversion = status => {
  for (const key in statusType) {
    if (key.toLowerCase() === status) {
      return statusType[key];
    }
  }
  return status;
};

export default statusConversion;
