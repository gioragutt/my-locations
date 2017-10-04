import { connect } from 'react-redux'
import Footer from '../components/Footer'

const mapStateToProps = (state, ownProps) => ({
    currentRoute: state.router.location.pathname  
});

export default connect(mapStateToProps)(Footer);
