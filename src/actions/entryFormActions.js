import { Notifications } from 'expo';
import * as firebase from 'firebase';
import { navigate, pop } from 'references/navigationRef';
import {
  ADD_ENTRY_REQUEST,
  ADD_ENTRY_SUCCESS,
  ADD_ENTRY_FAILURE,
  ADD_TO_GALLERY,
  REMOVE_FROM_GALLERY,
  CLEAR_GALLERY,
  CANCEL_ALARM,
} from 'constants/actionType';
import { sentEntryAlert } from 'constants/localNotification';
import uploadImageAsync from 'utils/uploadImageAsync';

let cancel;

const addEntry = (values, getProgress) => async dispatch => {
  dispatch({ type: ADD_ENTRY_REQUEST });
  try {
    const { reportType, phoneNumber, location, description, files } = values;

    const user = await firebase.auth().currentUser;
    const reportRef = await firebase.database().ref('reports');
    const reportMetaRef = await firebase.database().ref('reports-meta');
    const userReportsRef = await firebase.database().ref('user-reports');
    const newReportKey = await reportRef.push().key;

    const urlArray = files.map((item, index) => uploadImageAsync(item, index, newReportKey, getProgress));
    const images = await Promise.all(urlArray);

    const newReportMetaData = {
      reportId: newReportKey,
      userId: user.uid,
      createdOn: firebase.database.ServerValue.TIMESTAMP,
      status: 'pending',
      reportType,
    };

    const newReportData = {
      reportId: newReportKey,
      userId: user.uid,
      createdOn: firebase.database.ServerValue.TIMESTAMP,
      status: 'pending',
      reportType,
      phoneNumber,
      location,
      description,
      images,
    };
    await reportRef.child(newReportKey).set(newReportData);
    await reportMetaRef.child(`${user.uid}/${newReportKey}`).set(newReportMetaData);
    await userReportsRef.child(`${user.uid}/${newReportKey}`).set(true);

    dispatch({ type: ADD_ENTRY_SUCCESS });
    dispatch({ type: CLEAR_GALLERY });
  } catch (err) {
    dispatch({ type: ADD_ENTRY_FAILURE, payload: err });
    navigate('Form');
  }
};

const addDetectionFall = values => async dispatch => {
  dispatch({ type: ADD_ENTRY_REQUEST });
  try {
    const { reportType, phoneNumber, location, description } = values;

    const user = await firebase.auth().currentUser;
    const reportRef = await firebase.database().ref('reports');
    const reportMetaRef = await firebase.database().ref('reports-meta');
    const userReportsRef = await firebase.database().ref('user-reports');
    const newReportKey = await reportRef.push().key;

    const newReportMetaData = {
      reportId: newReportKey,
      userId: user.uid,
      createdOn: firebase.database.ServerValue.TIMESTAMP,
      status: 'pending',
      reportType,
    };

    const newReportData = {
      reportId: newReportKey,
      userId: user.uid,
      createdOn: firebase.database.ServerValue.TIMESTAMP,
      status: 'pending',
      reportType,
      phoneNumber,
      location,
      description,
    };
    await reportRef.child(newReportKey).set(newReportData);
    await reportMetaRef.child(`${user.uid}/${newReportKey}`).set(newReportMetaData);
    await userReportsRef.child(`${user.uid}/${newReportKey}`).set(true);

    dispatch({ type: ADD_ENTRY_SUCCESS });
    dispatch({ type: CANCEL_ALARM });
    Notifications.presentLocalNotificationAsync(sentEntryAlert);
  } catch (err) {
    dispatch({ type: ADD_ENTRY_FAILURE, payload: err });
  }
};

const addToGallery = (file, callback = false) => dispatch => {
  dispatch({ type: ADD_TO_GALLERY, payload: file });
  if (callback) {
    pop(2);
  }
};

const removeFromGallery = file => dispatch => {
  const { uri } = file;
  dispatch({ type: REMOVE_FROM_GALLERY, payload: uri });
  pop(1);
};

const clearGallery = () => dispatch => {
  dispatch({ type: CLEAR_GALLERY });
};

const cancelToken = () => () => {
  cancel();
};

export { addEntry, addDetectionFall, addToGallery, removeFromGallery, clearGallery, cancelToken };
