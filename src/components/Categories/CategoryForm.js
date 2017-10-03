import React, { Component } from 'react'

import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';

export default class extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: props.category || ''
        };
    }

    inputValid() {
        return this.state.value.length > 0 && this.props.canSubmit(this.state.value);
    }

    getValidationState() {
        return this.inputValid() ? 'success' : 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    renderForm() {
        return (
            <form onSubmit={e => e.preventDefault()}>
                <FormGroup
                    controlId="categoryName"
                    validationState={this.getValidationState()}
                >
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Category Name"
                        onChange={e => this.handleChange(e)}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </form>
        );
    }

    handleSubmit() {
        const { value } = this.state;
        const { canSubmit, onSubmit } = this.props;

        if (canSubmit(value)) {
            onSubmit(value);
        }
    }

    render() {
        const { show, onClose } = this.props;
        return (
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    {this.renderForm()}
                </Modal.Body>
    
                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                    <Button disabled={!this.inputValid()}
                            bsStyle="primary"
                            onClick={() => this.handleSubmit()}>
                        Save changes
                    </Button>
                </Modal.Footer>
            
            </Modal>
        );
    };
};