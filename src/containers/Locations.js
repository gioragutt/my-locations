import { connect } from 'react-redux';
import LocationsPage from '../components/Locations/LocationsPage';
import {
    selectLocation,
    removeLocation,
    addLocation,
    editLocation
} from '../actions/locations';

import {
    setCategoryFilter,
    resetCategoryFilter
} from '../actions/categories';

const mapStateToProps = (state, ownProps) => ({
    locations: state.locations.items,
    selectedLocation: state.locations.selected,
    categories: state.categories.items,
    categoryFilter: state.categories.filter
});

const mapDispatchToProps = {
    selectLocation,
    removeLocation,
    addLocation,
    editLocation,
    setCategoryFilter,
    resetCategoryFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsPage);
