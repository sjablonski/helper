import { connect } from 'react-redux';
import { clearError } from 'actions/errorActions';
import { addDetectionFall } from 'actions/entryFormActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import EmergencySOSScreen from './EmergencySOSScreen';

const mapStateToProps = ({ pendingState, errorState, locationState, userState }) => ({
  error: getError(errorState, 'ADD_ENTRY'),
  pending: getPending(pendingState, 'ADD_ENTRY'),
  location: locationState.locationEvent.location,
  phoneNumber: userState.phoneNumber,
});

const mapDispatchToProps = dispatch => ({
  addDetectionFall: values => dispatch(addDetectionFall(values)),
  clearError: () => dispatch(clearError('ADD_ENTRY')),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmergencySOSScreen);
