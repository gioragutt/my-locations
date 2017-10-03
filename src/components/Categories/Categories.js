import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import CategoriesNavbar from './CategoriesNavbar';
import CategoryForm from './CategoryForm';

export default class extends Component {
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
            <CategoryForm
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
            <CategoryForm
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
                <div className="container">
                    <ListGroup>
                        {this.renderCategoryList(categories)}
                    </ListGroup>
                </div>
            </div>
        )
    }
}