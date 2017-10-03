import { connect } from 'react-redux'
import Categories from '../components/Categories/Categories'
import { addCategory, selectCategory } from '../actions/categories';

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories.items,
    selectedCategory: state.categories.selected
})

const mapDispatchToProps = {
    addCategory,
    selectCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories)