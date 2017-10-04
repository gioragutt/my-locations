import React from 'react'

import {
    FormControl,
    ControlLabel,
    Button,
    Form,
    Col
} from 'react-bootstrap';

const CategoryFilter = ({value, availableCategories, onChange, resetFilter}) => (
    <Form horizontal className="container">
        <Col componentClass={ControlLabel} xs={2}>
            Filter Category
        </Col>
        <Col xs={8}>
            <FormControl
                componentClass="select"
                placeholder="Category"
                onChange={e => onChange(e.target.value)}
                value={value}
            >
                <option value="">No Filter</option>
                {availableCategories.map(cat =>
                    <option value={cat} key={cat}>{cat}</option>            
                )}
            </FormControl>
        </Col>
        <Col xs={2}>
            <Button onClick={resetFilter}>Reset</Button>
        </Col>
    </Form>
);

export default CategoryFilter;