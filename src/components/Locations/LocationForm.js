import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { Form, FormGroup, Col, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { CategoriesListPropType, LocationPropType } from './util';
import { isLatitudeValid, isLongitudeValid } from '../../models/location';

const FormRow = ({children, title, validationState}) => (
    <FormGroup controlId={title} validationState={validationState}>
        <Col componentClass={ControlLabel} sm={2}>
            {title}
        </Col>
        <Col sm={10}>
            {children}
            <FormControl.Feedback />
        </Col>
    </FormGroup>
);

const toValidationState = predicate => predicate ? 'success' : 'error';

const validateCategory = (category, categories) => {
    if (category) {
        return category;
    }

    if (categories.length > 0) {
        return categories[0];
    }

    return '';
}

export default class LocationForm extends Component {
    static propTypes = {
        categories: CategoriesListPropType,
        onSubmit: PropTypes.func.isRequired,
        locationChanged: PropTypes.func.isRequired,
        location: LocationPropType.isRequired
    }

    constructor(props) {
        super(props);

        const { location } = props;

        if (!location.category) {
            location.category = validateCategory(location.category, props.categories);
            props.locationChanged(location);
        }

        this.state = props.location;
    }

    renderCategoryOptions() {
        const { categories } = this.props;
        if (categories.length === 0) {
            return <option value={null}>You must first create a category!</option>;
        }

        return this.props.categories.map(cat =>
            <option value={cat} key={cat}>{cat}</option>            
        );
    }

    handleChange(change) {
        this.setState(change, () => this.props.locationChanged(this.state));
    }

    handleNameChange(e) {
        this.handleChange({name: e.target.value});
    }

    handleAddressChange(e) {
        this.handleChange({address: e.target.value});
    }

    handleCategoryChange(e) {
        this.handleChange({category: e.target.value});
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
                <FormRow title="Category" validationState={toValidationState(this.props.categories.length > 0)}>
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
                <Button type="submit" style={{opacity: 0}}/>
            </Form>
        )
    }
}