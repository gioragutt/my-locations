import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';
import CategoriesNavbar from './CategoriesNavbar';
import CategoryForm from './CategoryForm';

export default class extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            adding: false
        };
    }

    openAddDialog() {
        this.setState({adding: true});
    }

    closeAddDialog() {
        this.setState({adding: false});
    }

    select(category) {
        const selected = category === this.props.selectedCategory ? '' : category;
        this.props.selectCategory(selected);
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

    render() {
        const { categories } = this.props;
        const { adding } = this.state;
        return (
            <div>
                <CategoriesNavbar
                    categorySelected={!!this.state.selected}
                    onAdd={() => this.openAddDialog()}
                />
                <CategoryForm
                    show={adding}
                    canSubmit={cat => !this.props.categories.includes(cat)}
                    onSubmit={cat => this.addCategory(cat)}
                    onClose={() => this.closeAddDialog()}
                />
                <div className="container">
                    <ListGroup>
                        {this.renderCategoryList(categories)}
                    </ListGroup>
                </div>
            </div>
        )
    }
}