import { connect } from 'react-redux';
import Categories from '../components/Categories/Categories';
import { addCategory, selectCategory, removeCategory, editCategory } from '../actions/categories';

const mapStateToProps = (state, ownProps) => ({
    categories: state.categories.items,
    selectedCategory: state.categories.selected
});

const mapDispatchToProps = {
    addCategory,
    selectCategory,
    removeCategory,
    editCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories)