import React, { Component } from 'react'

import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';

export default class CategoryFromModal extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            value: props.category || ''
        };
    }

    inputValid() {
        return this.state.value.trim().length > 0 && this.props.canSubmit(this.state.value);
    }

    getValidationState() {
        return this.inputValid() ? 'success' : 'error';
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    renderForm() {
        return (
            <form onSubmit={e => {
                e.preventDefault()
                this.handleSubmit();
            }}>
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
        const { onSubmit } = this.props;

        if (this.inputValid(value)) {
            onSubmit(value);
            this.setState({value: ''})
        }
    }

    render() {
        const { onClose, category } = this.props;
        const action = !!category ? 'Edit' : 'Add'
        const title = `${action} Category`;
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