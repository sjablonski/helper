import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userState from 'reducers/userReducer';
import entryFormState from 'reducers/entryFormReducer';
import locationState from 'reducers/locationReducer';
import pendingState from 'reducers/pendingReducer';
import errorState from 'reducers/errorReducer';
import entryHistoryState from 'reducers/entryHistoryReducer';

const store = createStore(
  combineReducers({
    userState,
    entryFormState,
    locationState,
    entryHistoryState,
    errorState,
    pendingState,
  }),
  applyMiddleware(thunk),
);

export default store;
