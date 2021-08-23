import { connect } from 'react-redux';
import { tryLocalSignIn } from 'actions/authActions';
import ResolveAuthScreen from './ResolveAuthScreen';

const mapDispatchToProps = dispatch => {
  return { tryLocalSignIn: () => dispatch(tryLocalSignIn()) };
};

export default connect(
  null,
  mapDispatchToProps,
)(ResolveAuthScreen);
