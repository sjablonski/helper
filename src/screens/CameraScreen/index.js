import { connect } from 'react-redux';
import { addToGallery } from 'actions/entryFormActions';
import CameraScreen from './CameraScreen';

const mapDispatchToProps = dispatch => {
  return {
    addToGallery: file => dispatch(addToGallery(file, true)),
  };
};

export default connect(null, mapDispatchToProps)(CameraScreen);
