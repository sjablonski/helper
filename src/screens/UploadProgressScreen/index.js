import { connect } from 'react-redux';
import { addEntry, cancelToken } from 'actions/entryFormActions';
import UploadProgressScreen from './UploadProgressScreen';

const mapStateToProps = ({ entryHistoryState }) => ({
  isSuccess: entryHistoryState.isSuccess,
});

const mapDispatchToProps = dispatch => {
  return {
    addEntry: (values, getProgress) => dispatch(addEntry(values, getProgress)),
    cancelToken: () => dispatch(cancelToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadProgressScreen);
