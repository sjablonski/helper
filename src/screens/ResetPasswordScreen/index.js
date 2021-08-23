import { connect } from 'react-redux';
import { resetPassword } from 'actions/authActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import ResetPasswordScreen from './ResetPasswordScreen';

const mapStateToProps = ({ pendingState, errorState }) => ({
  error: getError(errorState, 'RESET_PASSWORD'),
  pending: getPending(pendingState, 'RESET_PASSWORD'),
});

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: ({ email }) => dispatch(resetPassword({ email })),
    clearError: () => dispatch(clearError('RESET_PASSWORD')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPasswordScreen);
