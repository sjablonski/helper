import { connect } from 'react-redux';
import { signUp } from 'actions/authActions';
import { addError, clearError } from 'actions/errorActions';
import { getError } from 'reducers/errorReducer';
import { getPending } from 'reducers/pendingReducer';
import SignUpScreen from './SignUpScreen';

const mapStateToProps = ({ pendingState, errorState }) => ({
  error: getError(errorState, 'SIGN_UP'),
  pending: getPending(pendingState, 'SIGN_UP'),
});

const mapDispatchToProps = dispatch => {
  return {
    signUp: values => dispatch(signUp(values)),
    addError: message => dispatch(addError('SIGN_UP', message)),
    clearError: () => dispatch(clearError('SIGN_UP')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpScreen);
