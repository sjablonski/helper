import { connect } from 'react-redux';
import { addMarkerLocation } from 'actions/locationActions';
import LocationSelectionScreen from './LocationSelectionScreen';

const mapStateToProps = ({ locationState }) => ({
  location: locationState.locationEvent.location,
});

const mapDispatchToProps = dispatch => ({
  addMarkerLocation: location => dispatch(addMarkerLocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocationSelectionScreen);
