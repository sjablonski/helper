import * as firebase from 'firebase';
import { Alert } from 'react-native';
import {
  UPDATE_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  FETCH_MEDICALID,
  FETCH_MEDICALID_REQUEST,
  FETCH_MEDICALID_SUCCESS,
  FETCH_MEDICALID_FAILURE,
  UPDATE_MEDICALID,
  UPDATE_MEDICALID_REQUEST,
  UPDATE_MEDICALID_SUCCESS,
  UPDATE_MEDICALID_FAILURE,
  FETCH_EMERGENCY_CONTACT,
  FETCH_EMERGENCY_CONTACT_REQUEST,
  FETCH_EMERGENCY_CONTACT_SUCCESS,
  FETCH_EMERGENCY_CONTACT_FAILURE,
  UPDATE_EMERGENCY_CONTACT,
  UPDATE_EMERGENCY_CONTACT_REQUEST,
  UPDATE_EMERGENCY_CONTACT_SUCCESS,
  UPDATE_EMERGENCY_CONTACT_FAILURE,
  CLEAR_ERROR,
} from 'constants/actionType';

const updateUserData = values => async dispatch => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const user = await firebase.auth().currentUser;
    const credential = await firebase.auth.EmailAuthProvider.credential(user.email, values.password);
    await user.reauthenticateWithCredential(credential);
    await user.updateEmail(values.email);
    if (values.phoneNumber !== user.phoneNumber) {
      await user.updatePhoneNumber(values.phoneNumber);
    }
    if (values.newPassword) {
      await user.updatePassword(values.newPassword);
    }
    Alert.alert('Sukces!', 'Dane profilu zostały zaktualizowane');
    dispatch({ type: UPDATE_USER_SUCCESS, payload: { uid: user.uid, email: user.email, phoneNumber: user.phoneNumber } });
    dispatch({ type: CLEAR_ERROR, payload: UPDATE_USER });
  } catch (err) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: err });
  }
};

const fetchMedicalID = () => async dispatch => {
  dispatch({ type: FETCH_MEDICALID_REQUEST });
  try {
    const user = firebase.auth().currentUser;
    const usersRef = firebase.database().ref('users');
    const data = await usersRef.child(`${user.uid}/medical-id`).once('value');
    dispatch({ type: FETCH_MEDICALID_SUCCESS, payload: data.val() });
    dispatch({ type: CLEAR_ERROR, payload: FETCH_MEDICALID });
  } catch (err) {
    dispatch({ type: FETCH_MEDICALID_FAILURE, payload: err });
  }
};

const updateMedicalID = values => async dispatch => {
  dispatch({ type: UPDATE_MEDICALID_REQUEST });
  try {
    const user = await firebase.auth().currentUser;
    const usersRef = await firebase.database().ref('users');
    await usersRef.child(`${user.uid}/medical-id`).update(values);
    Alert.alert('Sukces!', 'Karta medyczna została zaktualizowana');
    dispatch({ type: UPDATE_MEDICALID_SUCCESS, payload: values });
    dispatch({ type: CLEAR_ERROR, payload: UPDATE_MEDICALID });
  } catch (err) {
    dispatch({ type: UPDATE_MEDICALID_FAILURE, payload: err });
  }
};

const fetchEmergencyContact = () => async dispatch => {
  dispatch({ type: FETCH_EMERGENCY_CONTACT_REQUEST });
  try {
    const user = firebase.auth().currentUser;
    const usersRef = firebase.database().ref('users');
    const data = await usersRef.child(`${user.uid}/emergencyContact`).once('value');
    const contacts = data.val() ? Object.values(data.val()) : [];
    dispatch({ type: FETCH_EMERGENCY_CONTACT_SUCCESS, payload: contacts });
    dispatch({ type: CLEAR_ERROR, payload: FETCH_EMERGENCY_CONTACT });
  } catch (err) {
    dispatch({ type: FETCH_EMERGENCY_CONTACT_FAILURE, payload: err });
  }
};

const updateEmergencyContact = values => async dispatch => {
  dispatch({ type: UPDATE_EMERGENCY_CONTACT_REQUEST });
  try {
    const user = await firebase.auth().currentUser;
    const usersRef = await firebase.database().ref('users');
    await usersRef.child(user.uid).update(values);
    Alert.alert('Sukces!', 'Kontakty alarmowe zostały zaktualizowane');
    dispatch({ type: UPDATE_EMERGENCY_CONTACT_SUCCESS });
    dispatch({ type: CLEAR_ERROR, payload: UPDATE_EMERGENCY_CONTACT });
  } catch (err) {
    dispatch({ type: UPDATE_EMERGENCY_CONTACT_FAILURE, payload: err });
  }
};

export { updateUserData, fetchMedicalID, updateMedicalID, fetchEmergencyContact, updateEmergencyContact };
