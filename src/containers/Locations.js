import { connect } from 'react-redux'
import Locations from '../components/Locations/Locations'
import { selectLocation, removeLocation, addLocation, editLocation } from '../actions/locations'

const mapStateToProps = (state, ownProps) => ({
    locations: state.locations.items,
    selectedLocation: state.locations.selected,
    categories: state.categories.items
});

const mapDispatchToProps = {
    selectLocation,
    removeLocation,
    addLocation,
    editLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
