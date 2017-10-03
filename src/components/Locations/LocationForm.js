import React, { Component } from 'react';

import { Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

import { isLatitudeValid, isLongitudeValid } from '../../models/location';

const FormRow = ({children, title, validationState}) => (
    <FormGroup controlId={title} validationState={validationState}>
        <Col componentClass={ControlLabel} sm={2}>
            {title}
        </Col>
        <Col sm={10}>
            {children}
        </Col>
    </FormGroup>
);

const toValidationState = predicate => predicate ? 'success' : 'error';

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

    handleChange(change) {
        this.setState(change, () => this.props.locationChanged(this.state));
    }

    handleNameChange(e) {
        this.handleChange({name: e.target.value})
    }

    handleAddressChange(e) {
        this.handleChange({address: e.target.value})
    }

    handleCategoryChange(e) {
        this.handleChange({category: e.target.value})
    }

    handleLatitudeChange(e) {
        const coordinates = {...this.state.coordinates, lat: e.target.value};
        this.handleChange({coordinates})
    }

    handleLongitudeChange(e) {
        const coordinates = {...this.state.coordinates, long: e.target.value};
        this.handleChange({coordinates})
    }

    render() {
        const { name, address, category, coordinates } = this.state;
        return (
            <Form 
                horizontal
                onSubmit={e => {
                    e.preventDefault();
                    this.props.onSubmit(this.state);
                }}
            >
                <FormRow title="Name" validationState={toValidationState(name.length > 0)}>
                    <FormControl
                        type="text"
                        placeholder="Name"
                        onChange={e => this.handleNameChange(e)}
                        value={name}
                    />
                </FormRow>
                <FormRow title="Address" validationState={toValidationState(address.length > 0)}>
                    <FormControl
                        type="text"
                        placeholder="Address"
                        onChange={e => this.handleAddressChange(e)}
                        value={address}
                    />
                </FormRow>
                <FormRow title="Category">
                    <FormControl
                        componentClass="select"
                        placeholder="Category"
                        onChange={e => this.handleCategoryChange(e)}
                        value={category}
                    >
                        {this.renderCategoryOptions()}
                    </FormControl>
                </FormRow>
                <FormRow title="Latitude" validationState={toValidationState(isLatitudeValid(coordinates.lat))}>
                    <FormControl
                        type="text"
                        placeholder="Latitude"
                        onChange={e => this.handleLatitudeChange(e)}
                        value={coordinates.lat}
                    />
                </FormRow>
                <FormRow title="Longtitude" validationState={toValidationState(isLongitudeValid(coordinates.long))}>
                    <FormControl
                        type="text"
                        placeholder="Longtitude"
                        onChange={e => this.handleLongitudeChange(e)}
                        value={coordinates.long}
                    />
                </FormRow>
            </Form>
        )
    }
}