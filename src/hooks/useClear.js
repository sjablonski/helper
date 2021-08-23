import { useEffect } from 'react';

export default functionClear => {
  useEffect(() => () => functionClear(), []);
};
