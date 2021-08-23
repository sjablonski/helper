import { connect } from 'react-redux';
import { fetchEmergencyContact, updateEmergencyContact } from 'actions/userActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import EmergencyContactScreen from './EmergencyContactScreen';

const mapStateToProps = ({ pendingState, errorState, userState }) => ({
  errorFetch: getError(errorState, 'FETCH_EMERGENCY_CONTACT'),
  pendingFetch: getPending(pendingState, 'FETCH_EMERGENCY_CONTACT'),
  errorUpdate: getError(errorState, 'UPDATE_EMERGENCY_CONTACT'),
  pendingUpdate: getPending(pendingState, 'UPDATE_EMERGENCY_CONTACT'),
  emergencyContact: userState.emergencyContact,
});

const dispatchToProps = dispatch => ({
  fetchEmergencyContact: () => dispatch(fetchEmergencyContact()),
  updateEmergencyContact: values => dispatch(updateEmergencyContact(values)),
  clearError: () => dispatch(clearError('UPDATE_EMERGENCY_CONTACT')),
});

export default connect(
  mapStateToProps,
  dispatchToProps,
)(EmergencyContactScreen);
