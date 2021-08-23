import { connect } from 'react-redux';
import { fetchMedicalID, updateMedicalID } from 'actions/userActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import MedicalIDScreen from './MedicalIDScreen';

const mapStateToProps = ({ pendingState, errorState, userState }) => ({
  errorFetch: getError(errorState, 'FETCH_MEDICALID'),
  errorUpdate: getError(errorState, 'UPDATE_MEDICALID'),
  pendingFetch: getPending(pendingState, 'FETCH_MEDICALID'),
  pendingUpdate: getPending(pendingState, 'UPDATE_MEDICALID'),
  medicalID: userState.medicalID,
});

const dispatchToProps = dispatch => ({
  fetchMedicalID: () => dispatch(fetchMedicalID()),
  updateMedicalID: values => dispatch(updateMedicalID(values)),
  clearError: () => dispatch(clearError('UPDATE_MEDICALID')),
});

export default connect(
  mapStateToProps,
  dispatchToProps,
)(MedicalIDScreen);
