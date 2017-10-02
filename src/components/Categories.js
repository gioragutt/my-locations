import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Navbar from './Navbar';

const MOCK_CATEGORIES = [
    'cat1',
    'cat2'
]

const CategoriesNavbar = ({categorySelected}) => {
    return <Navbar
        title="Categories"
        items={[
            {
                title: 'Add',
                onClick: () => console.log('categories edit clicked'),
            },
            {
                title: 'Edit',
                onClick: () => console.log('categories edit clicked'),
                disabled: !categorySelected
            },
            {
                title: 'Remove',
                onClick: () => console.log('categories remove clicked'),
                disabled: !categorySelected
            },
        ]}
    />
}

export default class extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selected: ''
        };
    }

    select(event, category) {
        const selected = category === this.state.selected ? '' : category;
        this.setState({selected});
    }

    render() {
        return (
            <div>
                <CategoriesNavbar categorySelected={!!this.state.selected}/>
                <div className="container">
                    <ListGroup>
                    {MOCK_CATEGORIES.map((cat, index) => (
                        <ListGroupItem key={`category-item-${index}`}
                                       active={cat === this.state.selected}
                                       onClick={(event) => this.select(event, cat)}>
                            {cat}
                        </ListGroupItem>
                    ))}
                    </ListGroup>
                </div>
            </div>
        )
    }
}