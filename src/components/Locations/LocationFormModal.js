import React, { Component } from 'react'

import { Modal, Button } from 'react-bootstrap';
import LocationForm from './LocationForm';

import { isLocationValid } from '../../models/location';

const emptyLocation = (category) => ({
    name: '',
    address: '',
    category,
    coordinates: {lat: 33, long: 33}
});

export default class LocationFormModal extends Component {
    
    constructor(props) {
        super(props);

        this.state = props.location ? {...props.location} : emptyLocation(this.props.categories[0]);
    }

    inputValid() {
        return isLocationValid(this.state, this.props.categories);
    }

    renderForm() {
        return (
            <LocationForm 
                location={this.state}
                categories={this.props.categories}
                locationChanged={location => this.setState(location)}
                onSubmit={this.props.onSubmit}
            />
        );
    }
    
    handleSubmit() {
        const location = this.state;

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