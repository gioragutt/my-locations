import React, { Component } from 'react'

import { Modal, Button } from 'react-bootstrap';
import LocationForm from './LocationForm';

const emptyLocation = () => ({
    name: '',
    address: '',
    category: '',
    location: {lat: 33, long: 33}
});

export default class LocationFormModal extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            location: {...props.location} || emptyLocation()
        };
    }

    inputValid() {
        // return isLocationValid(this.location) && this.props.canSubmit(this.state.value);
        return true;
    }

    getValidationState() {
        return this.inputValid() ? 'success' : 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    renderForm() {
        return (
            <LocationForm 
                location={this.state.location}
                categories={this.props.categories}
            />
        );
    }

    handleSubmit() {
        const { value } = this.state;
        const { onSubmit } = this.props;

        if (this.inputValid(value)) {
            onSubmit(value);
            this.setState({value: ''})
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