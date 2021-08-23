import { connect } from 'react-redux';
import { addLocation } from 'actions/locationActions';
import { addToGallery, removeFromGallery, clearGallery } from 'actions/entryFormActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import EntryFormScreen from './EntryFormScreen';

const mapStateToProps = ({ pendingState, errorState, locationState, entryFormState, userState }) => ({
  error: getError(errorState, 'ADD_ENTRY'),
  pending: getPending(pendingState, 'ADD_ENTRY'),
  locationEvent: locationState.locationEvent,
  galleryFiles: entryFormState.galleryFiles,
  phoneNumber: userState.phoneNumber,
});

const mapDispatchToProps = dispatch => ({
  addLocation: location => dispatch(addLocation(location)),
  addToGallery: file => dispatch(addToGallery(file)),
  removeFromGallery: file => dispatch(removeFromGallery(file)),
  clearGallery: () => dispatch(clearGallery()),
  clearError: () => dispatch(clearError('ADD_ENTRY')),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryFormScreen);
