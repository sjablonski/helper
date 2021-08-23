import { connect } from 'react-redux';
import { signOut } from 'actions/authActions';
import DrawerContent from './DrawerContent';

const mapDispatchToProps = dispatch => {
  return { signOut: () => dispatch(signOut()) };
};

export default connect(null, mapDispatchToProps)(DrawerContent);
