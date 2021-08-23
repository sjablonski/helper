import { connect } from 'react-redux';
import { updateUserData } from 'actions/userActions';
import { addError, clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import UserAccountScreen from './UserAccountScreen';

const mapStateToProps = ({ pendingState, errorState, userState }) => ({
  error: getError(errorState, 'UPDATE_USER'),
  pending: getPending(pendingState, 'UPDATE_USER'),
  email: userState.email,
  phoneNumber: userState.phoneNumber,
});

const dispatchToProps = dispatch => ({
  updateUserData: values => dispatch(updateUserData(values)),
  addError: message => dispatch(addError('UPDATE_USER', message)),
  clearError: () => dispatch(clearError('UPDATE_USER')),
});

export default connect(
  mapStateToProps,
  dispatchToProps,
)(UserAccountScreen);
