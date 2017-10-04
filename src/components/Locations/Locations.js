import React, { Component } from 'react';

import { Table, Glyphicon } from 'react-bootstrap';
import LocationsNavbar from './LocationsNavbar';
import LocationFormModal from './LocationFormModal';
import CategoryFilter from './CategoryFilter';
import SortableLocationsRows from './SortableLocationsRows';
import './Locations.css';

import vibrate from '../../vibrate';
import { Map, LocationMarker } from '../Map';

const SortGlyph = ({sort}) => {
    if (sort === 'asc') {
        return <span>{' '}<Glyphicon glyph="chevron-up"/></span>
    } else if (sort === 'dsc') {
        return <span>{' '}<Glyphicon glyph="chevron-down"/></span>
    }

    return null;
}

const toggleSortByCategory = (sortByCategory) => {
    switch (sortByCategory) {
        case null:
            return 'asc';
        case 'asc':
            return 'dsc';
        case 'dsc':
            return null;
        default:
            return null;
    }
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

    toggleSelect(location, onSelect = () => {}) {
        const { selectedLocation: selected } = this.props;
        if (selected && location.id === selected.id) {
            this.deselect();
        } else {
            this.props.selectLocation(location);
            onSelect(location);
        }
    }

    select(location) {
        this.toggleSelect(location, loc => {
            this.map.panTo({
                lat: loc.coordinates.lat,
                lng: loc.coordinates.long
            });
        })
    }

    selectFromMap(location) {
        this.toggleSelect(location);
        vibrate(100);
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

    toggleCategorySort() {
        const sortByCategory = toggleSortByCategory(this.state.sortByCategory);
        this.setState({sortByCategory});
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

                <CategoryFilter
                    onChange={this.props.setCategoryFilter}
                    resetFilter={this.props.resetCategoryFilter}
                    value={this.props.categoryFilter}
                    availableCategories={this.props.categories}
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
                            <SortableLocationsRows
                                locations={this.props.locations}
                                sortByCategory={this.state.sortByCategory}
                                categoryFilter={this.props.categoryFilter}
                                onClick={loc => this.select(loc)}
                                selectedLocation={this.props.selectedLocation}
                            />
                        </tbody>
                    </Table>
                </div>

                <Map mapRef={map => { this.map = map; console.log('map', map)}}>
                    {
                        this.props.locations.map(loc => (
                            <LocationMarker
                                key={loc.id}
                                location={loc}
                                onClick={loc => this.selectFromMap(loc)}
                                isSelected={this.props.selectedLocation && loc.id === this.props.selectedLocation.id}
                            />))
                    }
                </Map>
            </div>
        )
    }
}