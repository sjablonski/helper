import React, { useState } from 'react';
import { Searchbar as SearchbarPaper } from 'react-native-paper';
import getLocationByAddress from 'utils/getLocationByAddress';

const Searchbar = ({ callback, secondCallback, ...props }) => {
  const [query, setQuery] = useState('');

  const handleEndQuery = () => {
    if (secondCallback) secondCallback();
    getLocationByAddress(query, callback);
  };

  return <SearchbarPaper onChangeText={setQuery} onEndEditing={handleEndQuery} value={query} {...props} testID="searchbar" />;
};

export default Searchbar;
