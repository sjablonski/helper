import { connect } from 'react-redux';
import { addLocation } from 'actions/locationActions';
import MapScreen from './MapScreen';

const mapStateToProps = ({ locationState }) => ({ location: locationState.currentLocation.location });

const mapDispatchToProps = dispatch => ({
  addLocation: location => dispatch(addLocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreen);
