import * as firebase from 'firebase';
import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_REQUEST,
  FETCH_ENTRIES_SUCCESS,
  FETCH_ENTRIES_FAILURE,
  CANCEL_ENTRY_REQUEST,
  CANCEL_ENTRY_SUCCESS,
  ADD_ENTRY_SUCCESS,
  CANCEL_ENTRY_FAILURE,
  UPDATE_ENTRIES,
  FETCH_ENTRY_DETAILS_REQUEST,
  FETCH_ENTRY_DETAILS_SUCCESS,
  FETCH_ENTRY_DETAILS_FAILURE,
  CLEAR_ENTRIES,
  CLEAR_ERROR,
} from 'constants/actionType';

const listenReportList = () => async dispatch => {
  try {
    const user = firebase.auth().currentUser;
    const reportListRef = firebase.database().ref(`reports-meta/${user.uid}`);

    reportListRef
      .orderByChild('createdOn')
      .startAt(Date.now())
      .on('child_added', data => {
        dispatch({ type: ADD_ENTRY_SUCCESS, payload: data.val() });
      });

    reportListRef.on('child_changed', data => {
      dispatch({ type: UPDATE_ENTRIES, payload: data.val() });
    });
  } catch (err) {
    dispatch({ type: FETCH_ENTRIES_FAILURE, payload: err });
  }
};

const fetchEntries = () => async dispatch => {
  dispatch({ type: FETCH_ENTRIES_REQUEST });
  try {
    const user = firebase.auth().currentUser;
    const reportListRef = firebase.database().ref(`reports-meta/${user.uid}`);
    const ref = reportListRef.limitToLast(10);
    const data = await ref.once('value');
    const reports = data.val() ? Object.values(data.val()).reverse() : [];
    dispatch({ type: FETCH_ENTRIES_SUCCESS, payload: reports });
  } catch (err) {
    dispatch({ type: FETCH_ENTRIES_FAILURE, payload: err });
  }
};

const fetchMoreEntries = lastId => async dispatch => {
  dispatch({ type: FETCH_ENTRIES_REQUEST });
  try {
    const user = firebase.auth().currentUser;
    const reportListRef = firebase.database().ref(`reports-meta/${user.uid}`);
    const ref = await reportListRef
      .orderByKey()
      .endAt(lastId)
      .limitToLast(11);
    const data = await ref.once('value');
    const reports = Object.values(data.val())
      .filter(item => item.reportId !== lastId)
      .reverse();
    dispatch({ type: FETCH_ENTRIES_SUCCESS, payload: reports });
  } catch (err) {
    dispatch({ type: FETCH_ENTRIES_FAILURE, payload: err });
  }
};

const refreshEntries = limitLength => async dispatch => {
  dispatch({ type: FETCH_ENTRIES_REQUEST });
  try {
    const user = firebase.auth().currentUser;
    const reportListRef = firebase.database().ref(`reports-meta/${user.uid}`);
    const ref = reportListRef.limitToLast(limitLength);
    const data = await ref.once('value');
    const reports = Object.values(data.val()).reverse();
    dispatch({ type: CLEAR_ENTRIES });
    dispatch({ type: FETCH_ENTRIES_SUCCESS, payload: reports });
    dispatch({ type: CLEAR_ERROR, payload: FETCH_ENTRIES });
  } catch (err) {
    dispatch({ type: FETCH_ENTRIES_FAILURE, payload: err });
  }
};

const cancelSentEntry = id => async dispatch => {
  dispatch({ type: CANCEL_ENTRY_REQUEST });
  try {
    const user = firebase.auth().currentUser;
    const updates = {};
    updates[`/reports-meta/${user.uid}/${id}/status`] = 'cancel';
    updates[`/reports/${id}/status`] = 'cancel';
    await firebase
      .database()
      .ref()
      .update(updates);
    dispatch({ type: CANCEL_ENTRY_SUCCESS });
  } catch (err) {
    dispatch({ type: CANCEL_ENTRY_FAILURE, payload: err });
  }
};

const fetchEntryDetails = reportId => async dispatch => {
  dispatch({ type: FETCH_ENTRY_DETAILS_REQUEST });
  try {
    const reportListRef = firebase.database().ref(`reports/${reportId}`);
    const data = await reportListRef.once('value');
    dispatch({ type: FETCH_ENTRY_DETAILS_SUCCESS, payload: data.val() });
  } catch (err) {
    dispatch({ type: FETCH_ENTRY_DETAILS_FAILURE, payload: err });
  }
};

export { fetchEntries, fetchMoreEntries, listenReportList, refreshEntries, cancelSentEntry, fetchEntryDetails };
