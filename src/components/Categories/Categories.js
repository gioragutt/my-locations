import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import CategoriesNavbar from './CategoriesNavbar';
import CategoryFormModal from './CategoryFormModal';

export default class Categories extends Component {
    static propTypes = {
        selectedCategory: PropTypes.string.isRequired,
        addCategory: PropTypes.func.isRequired,
        editCategory: PropTypes.func.isRequired,
        selectCategory: PropTypes.func.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired
    }

    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false
        };
    }

    openAddDialog() {
        this.deselect();
        this.setState({adding: true});
    }

    closeAddDialog() {
        this.setState({adding: false});
    }

    openEditDialog() {
        this.setState({editing: true});
    }

    closeEditDialog() {
        this.setState({editing: false});
    }

    deselect() {
        this.props.selectCategory('');
    }

    select(category) {
        if (category === this.props.selectedCategory) {
            this.deselect();
        } else {
            this.props.selectCategory(category);
        }
    }

    renderCategoryList(categories) {
        return categories.map((cat, index) => (
            <ListGroupItem key={`category-item-${index}`}
                           active={cat === this.props.selectedCategory}
                           onClick={() => this.select(cat)}>
                {cat}
            </ListGroupItem>
        ));
    }

    addCategory(category) {
        this.closeAddDialog();
        this.props.addCategory(category);
    }

    editCategory(newCategory) {
        this.closeEditDialog();
        const { selectedCategory: oldCategory } = this.props;
        this.props.editCategory(oldCategory, newCategory);
    }

    renderAddForm() {
        if (!this.state.adding) {
            return;
        }

        return (
            <CategoryFormModal
                canSubmit={cat => !this.props.categories.includes(cat)}
                onSubmit={cat => this.addCategory(cat)}
                onClose={() => this.closeAddDialog()}
            />
        )
    }

    renderEditForm() {
        if (!this.state.editing) {
            return;
        }

        return (
            <CategoryFormModal
                canSubmit={cat => !this.props.categories.includes(cat)}
                onSubmit={cat => this.editCategory(cat)}
                onClose={() => this.closeEditDialog()}
                category={this.props.selectedCategory}
            />
        );
    }

    removeSelectedCategory() {
        const { selectedCategory } = this.props;
        this.props.removeCategory(selectedCategory);
    }

    render() {
        const { categories } = this.props;
        const thereAreCategories = categories.length > 0;
        
        return (
            <div>
                <CategoriesNavbar
                    categorySelected={!!this.props.selectedCategory}
                    onAdd={() => this.openAddDialog()}
                    onRemove={() => this.removeSelectedCategory()}
                    onEdit={() => this.openEditDialog()}
                />
                {this.renderAddForm()}
                {this.renderEditForm()}
                <div className="container fill-navbar-space">
                    {
                        thereAreCategories 
                        ? <ListGroup>
                            {this.renderCategoryList(categories)}
                        </ListGroup>
                        : <h3>No categories to show</h3> 
                    }
                </div>
            </div>
        )
    }
}