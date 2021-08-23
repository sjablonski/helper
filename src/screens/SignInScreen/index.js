import { connect } from 'react-redux';
import { signIn } from 'actions/authActions';
import { clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import SignInScreen from './SignInScreen';

const mapStateToProps = ({ pendingState, errorState }) => ({
  error: getError(errorState, 'SIGN_IN'),
  pending: getPending(pendingState, 'SIGN_IN'),
});

const mapDispatchToProps = dispatch => {
  return { signIn: values => dispatch(signIn(values)), clearError: () => dispatch(clearError('SIGN_IN')) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);
