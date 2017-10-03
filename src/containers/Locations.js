import { connect } from 'react-redux'
import Locations from '../components/Locations/Locations'
import { actionCreator } from '../actions/locations'

const mapStateToProps = (state, ownProps) => ({
    locations: state.locations.items,
    selectedLocation: state.locations.selected
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations)
