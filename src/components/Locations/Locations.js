import React, { Component } from 'react';

// import { ListGroup, ListGroupItem } from 'react-bootstrap';


export default class extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false
        };
    }

    openAddDialog() {
        this.deselect();
        this.setState({adding: true});
    }

    closeAddDialog() {
        this.setState({adding: false});
    }

    openEditDialog() {
        this.setState({editing: true});
    }

    closeEditDialog() {
        this.setState({editing: false});
    }

    deselect() {
        this.props.selectLocation(null);
    }

    select(location) {
        if (location.id === this.props.selectedLocation.id) {
            this.deselect();
        } else {
            this.props.selectLocation(location);
        }
    }

    renderAddForm() {
        if (!this.state.adding) {
            return;
        }
    }

    renderEditForm() {
        if (!this.state.editing) {
            return;
        }
    }

    removeSelectedCategory() {
        const { selectedLocation } = this.props;
        this.props.removeLocation(selectedLocation);
    }

    render() {
        const { locations, selectedLocation } = this.props;
        return (
            <div>
                {this.renderAddForm()}
                {this.renderEditForm()}
                <div className="container">
                    <div>locations:</div>
                    <pre>{JSON.stringify(locations)}</pre>
                    <div>selected location:</div>
                    <pre>{JSON.stringify(selectedLocation)}</pre>
                </div>
            </div>
        )
    }
}