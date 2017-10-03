import React, { Component } from 'react';

import { Table, Glyphicon } from 'react-bootstrap';
import LocationsNavbar from './LocationsNavbar';
import LocationFormModal from './LocationFormModal';

import './Locations.css';

const SortGlyph = ({sort}) => {
    if (sort === 'asc') {
        return <span>{' '}<Glyphicon glyph="chevron-up"/></span>
    } else if (sort === 'dsc') {
        return <span>{' '}<Glyphicon glyph="chevron-down"/></span>
    }

    return null;
}

export default class Locations extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false,
            sortByCategory: null
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

    toggleCategorySort() {
        const sortByCategory = (() => {
            switch (this.state.sortByCategory) {
                case null:
                    return 'asc';
                case 'asc':
                    return 'dsc';
                case 'dsc':
                    return null;
                default:
                    return null;
            }
        })();
        this.setState({sortByCategory});
    }

    sortByCategory() {
        const { sortByCategory: sortMethod } = this.state;
        const sort = pred => 
            this.sortedLocations(this.props.locations)
                .sort((first, second) => pred(first.category.toLowerCase(), second.category.toLowerCase()));
                
        switch (sortMethod) {
            case null: return [];
            case 'asc': return sort((a, b) => a < b);
            case 'dsc': return sort((a, b) => a > b);
            default: return []
        }
    }

    sortedLocations(locations) {
        return locations.slice().sort((first, second) => 
            first.name.toLowerCase() > second.name.toLowerCase())
    }

    renderRows() {
        return (() => {
           if (this.state.sortByCategory) {
                return this.sortByCategory();
            }
            
            return this.sortedLocations(this.props.locations);
        })().map(loc => this.renderRow(loc));
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
                                <th>Name</th>
                                <th>Address</th>
                                <th className="sortable" onClick={() => this.toggleCategorySort()}>
                                    Category
                                    <SortGlyph sort={this.state.sortByCategory} />
                                </th>
                                <th>Latitude</th>
                                <th>Longitude</th>
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