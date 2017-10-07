import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Button } from 'react-bootstrap';
import LocationForm from './LocationForm';

import { CategoriesListPropType, LocationPropType, CoordinatesPropTypes } from './util';
import { isLocationValid } from '../../models/location';
import { PLACEHOLDER_COORDINATES } from '../../constants';

const emptyLocation = (category, defaultCoordinates, defaultAddress) => ({
    name: '',
    address: defaultAddress || '',
    category,
    coordinates: defaultCoordinates || PLACEHOLDER_COORDINATES
});

export default class LocationFormModal extends Component {
    static propTypes = {
        location: LocationPropType,
        categories: CategoriesListPropType,
        defaultCoordinates: CoordinatesPropTypes,
        defaultAddress: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props);

        this.state = props.location
            ? {...props.location}
            : emptyLocation(this.props.categories[0], props.defaultCoordinates, props.defaultAddress);
    }

    inputValid() {
        return this.props.categories.length > 0 && isLocationValid(this.state, this.props.categories);
    }

    renderForm() {
        return (
            <LocationForm 
                location={this.state}
                categories={this.props.categories}
                locationChanged={location => this.setState(location)}
                onSubmit={() => this.handleSubmit()}
            />
        );
    }
    
    handleSubmit() {
        const location = {...this.state};
        console.log(location);
        location.coordinates.lat = Number.parseFloat(location.coordinates.lat);
        location.coordinates.long = Number.parseFloat(location.coordinates.long);

        if (this.inputValid(location)) {
            this.props.onSubmit(location);
            this.setState(emptyLocation(this.props.categories[0]))
        }
    }

    render() {
        const { onClose, location } = this.props;
        const action = location && location.id !== null ? 'Edit' : 'Add'
        const title = `${action} Location`;

        return (
            <Modal show={true} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    {this.renderForm()}
                </Modal.Body>
    
                <Modal.Footer>
                    <Button disabled={!this.inputValid()}
                            bsStyle="primary"
                            onClick={() => this.handleSubmit()}>
                        {action}
                    </Button>
                    <Button onClick={onClose}>Close</Button>
                </Modal.Footer>
            
            </Modal>
        );
    };
};