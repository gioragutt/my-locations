import React, { Component } from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

import { isLocationValid } from '../../models/location';

const FormRow = ({children, title}) => (
    <FormGroup controlId={title}>
        <Col componentClass={ControlLabel} sm={2}>
            {title}
        </Col>
        <Col sm={10}>
            {children}
        </Col>
    </FormGroup>
);

export default class LocationForm extends Component {
    constructor(props) {
        super(props);

        this.state = props.location;
    }

    renderCategoryOptions() {
        return this.props.categories.map(cat =>
            <option value={cat} key={cat}>{cat}</option>            
        )
    }

    render() {
        return (
            <Form horizontal>
                <FormRow title="Name">
                    <FormControl type="text" placeholder="Name"/>
                </FormRow>
                <FormRow title="Address">
                    <FormControl type="text" placeholder="Address"/>
                </FormRow>
                <FormRow title="Address">
                    <FormControl componentClass="select" placeholder="Category">
                        {this.renderCategoryOptions()}
                    </FormControl>
                </FormRow>
                <FormRow title="Latitude">
                    <FormControl type="text" placeholder="Latitude"/>
                </FormRow>
                <FormRow title="Longtitude">
                    <FormControl type="text" placeholder="Longtitude"/>
                </FormRow>
            </Form>
        )
    }
}