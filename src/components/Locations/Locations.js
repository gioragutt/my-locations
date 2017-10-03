import React, { Component } from 'react';

import { Table } from 'react-bootstrap';
import LocationsNavbar from './LocationsNavbar';
import LocationFormModal from './LocationFormModal';

import './Locations.css';

export default class Locations extends Component {
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
        const { selectedLocation: selected } = this.props;
        if (selected && location.id === selected.id) {
            this.deselect();
        } else {
            this.props.selectLocation(location);
        }
    }

    addLocation(location) {
        this.closeAddDialog();
        this.props.addLocation(location);
    }

    renderAddForm() {
        if (!this.state.adding) {
            return;
        }

        return (
            <LocationFormModal
                categories={this.props.categories}
                onClose={() => this.closeAddDialog()}
                onSubmit={loc => this.addLocation(loc)}
            />
        );
    }

    editLocation(location) {
        if (!this.props.selectedLocation) {
            return;
        }

        this.closeEditDialog();
        this.props.editLocation(this.props.selectedLocation.id, location);
    }

    renderEditForm() {
        if (!this.state.editing) {
            return;
        }

        return (
            <LocationFormModal
                categories={this.props.categories}
                onClose={() => this.closeEditDialog()}
                onSubmit={loc => this.editLocation(loc)}
                location={this.props.selectedLocation}
            />
        );
    }

    removeSelectedCategory() {
        const { selectedLocation } = this.props;
        if (!selectedLocation) {
            return;
        }
        this.props.removeLocation(selectedLocation);
    }

    renderHeaders() {
        return ['Name', 'Address', 'Category', 'Lattitude', 'Longitude'].map((header, index) => 
            <th key={`${header}-${index}`}>
                {header}
            </th>
        );
    }

    renderRow(location) {
        const { selectedLocation } = this.props;
        const rowSelected = selectedLocation && selectedLocation.id === location.id;
        return (
            <tr className={rowSelected ? 'bg-primary' : ''}
                onClick={() => this.select(location)}
                key={location.id}>
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td>{location.category}</td>
                <td>{location.coordinates.lat}</td>
                <td>{location.coordinates.long}</td>
            </tr>
        );
    }

    renderRows() {
        return this.props.locations.map(loc => this.renderRow(loc));
    }

    render() {
        return (
            <div>
                <LocationsNavbar
                    locationSelected={!!this.props.selectedLocation}
                    onAdd={() => this.openAddDialog()}
                    onRemove={() => this.removeSelectedCategory()}
                    onEdit={() => this.openEditDialog()} 
                />
                {this.renderAddForm()}
                {this.renderEditForm()}
                <div className="container locations-table">
                    <Table responsive>
                        <thead>
                            <tr>
                                {this.renderHeaders()}
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}