import { connect } from 'react-redux'
import Locations from '../components/Locations/Locations'
import { selectLocation, removeLocation } from '../actions/locations'

const mapStateToProps = (state, ownProps) => ({
    locations: state.locations.items,
    selectedLocation: state.locations.selected,
    categories: state.categories.items
});

const mapDispatchToProps = {
    selectLocation,
    removeLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
