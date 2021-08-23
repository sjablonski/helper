import { connect } from 'react-redux';
import { fetchEntryDetails, cancelSentEntry } from 'actions/entryHistoryActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import EntryDetailsScreen from './EntryDetailsScreen';

const mapStateToProps = ({ pendingState, errorState, entryHistoryState }) => ({
  error: getError(errorState, 'FETCH_ENTRY_DETAILS'),
  pending: getPending(pendingState, 'FETCH_ENTRY_DETAILS'),
  details: entryHistoryState.details,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchEntryDetails: id => dispatch(fetchEntryDetails(id)),
    cancelSentEntry: id => dispatch(cancelSentEntry(id)),
    clearError: () => dispatch(clearError('FETCH_ENTRY_DETAILS')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryDetailsScreen);
