import * as firebase from 'firebase';
import { Alert } from 'react-native';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  SIGN_OUT,
  CLEAR_ENTRIES,
} from 'constants/actionType';
import { navigate } from 'references/navigationRef';

const signIn = ({ email, password }) => async dispatch => {
  dispatch({ type: SIGN_IN_REQUEST });
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const { uid, phoneNumber } = await firebase.auth().currentUser;
    dispatch({ type: SIGN_IN_SUCCESS, payload: { uid, phoneNumber } });
    navigate('Main');
  } catch (err) {
    dispatch({ type: SIGN_IN_FAILURE, payload: err });
  }
};

const signUp = values => async dispatch => {
  const { email, phoneNumber, password } = values;
  dispatch({ type: SIGN_UP_REQUEST });
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = await firebase.auth().currentUser;
    await user.updatePhoneNumber(phoneNumber);
    dispatch({ type: SIGN_UP_SUCCESS, payload: { uid: user.uid, email: user.email, phoneNumber: user.phoneNumber } });
    navigate('Main');
  } catch (err) {
    dispatch({ type: SIGN_UP_FAILURE, payload: err });
  }
};

const signOut = () => async dispatch => {
  firebase.auth().signOut();
  dispatch({ type: CLEAR_ENTRIES });
  dispatch({ type: SIGN_OUT });
  navigate('Login');
};

const resetPassword = ({ email }) => async dispatch => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    Alert.alert('Sukces!', 'Dalsze instrukcje zostały wysłane na email');
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (err) {
    dispatch({ type: RESET_PASSWORD_FAILURE, payload: err });
  }
};

const tryLocalSignIn = () => async dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      navigate('Main');
    } else {
      navigate('Login');
    }
  });
};

export { signIn, signUp, signOut, resetPassword, tryLocalSignIn };
