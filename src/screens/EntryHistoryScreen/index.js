import { connect } from 'react-redux';
import { fetchEntries, fetchMoreEntries, listenReportList, refreshEntries } from 'actions/entryHistoryActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import EntryHistoryScreen from './EntryHistoryScreen';

const mapStateToProps = ({ pendingState, errorState, entryHistoryState }) => ({
  error: getError(errorState, 'FETCH_ENTRIES'),
  pending: getPending(pendingState, 'FETCH_ENTRIES'),
  entries: entryHistoryState.entries,
  lastId: entryHistoryState.lastId,
});

const mapDispatchToProps = dispatch => ({
  fetchEntries: () => dispatch(fetchEntries()),
  fetchMoreEntries: lastId => dispatch(fetchMoreEntries(lastId)),
  listenReportList: () => dispatch(listenReportList()),
  refreshEntries: limitLength => dispatch(refreshEntries(limitLength)),
  clearError: () => dispatch(clearError('FETCH_ENTRIES')),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryHistoryScreen);
