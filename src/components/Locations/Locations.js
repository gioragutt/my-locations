import React, { Component } from 'react';

import LocationsNavbar from './LocationsNavbar';
import LocationFormModal from './LocationFormModal';
import CategoryFilter from './CategoryFilter';
import LocationsMap from './LocationsMap';
import LocationsTable from './LocationsTable';

import sortAndFilterLocations from './sortAndFilterLocations';
import vibrate from '../../vibrate';

import './Locations.css';

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
        this.toggleSelect(location, loc => this.map.panTo(loc.coordinates));
    }

    selectFromMap(location) {
        this.select(location);
        vibrate(100);
    }

    addLocation(location) {
        this.closeAddDialog();
        this.props.addLocation(location);
    }

    getMapRef(map) {
        if (!this.map) {
            this.map = map;
        }
    }

    renderAddForm() {
        if (!this.state.adding) {
            return;
        }

        const additionData = this.map.additionData();
        const onSubmit = loc => {
            this.addLocation(loc);
            if (additionData.coordinates) {
                this.map.resetAddition();
            }
        }

        return (
            <LocationFormModal
                categories={this.props.categories}
                onClose={() => this.closeAddDialog()}
                onSubmit={onSubmit}
                defaultCoordinates={additionData.coordinates}
                defaultAddress={additionData.address}
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

    onAddFromMap() {
        this.openAddDialog();
    }

    onMapClick() {
        this.deselect();
        this.map.resetAddition();
    }

    render() {
        const filteredSortedLocations = sortAndFilterLocations(
            this.props.locations,
            this.state.sortByCategory,
            this.props.categoryFilter
        );

        return (
            <div>
                <LocationsNavbar
                    locationSelected={!!this.props.selectedLocation}
                    onAdd={() => this.openAddDialog()}
                    onRemove={() => this.removeSelectedCategory()}
                    onEdit={() => this.openEditDialog()} 
                />
                <div className="category-filter fill-navbar-space">
                    <CategoryFilter
                        onChange={this.props.setCategoryFilter}
                        resetFilter={this.props.resetCategoryFilter}
                        value={this.props.categoryFilter}
                        availableCategories={this.props.categories}
                    />
                </div>
                
                {this.renderAddForm()}
                {this.renderEditForm()}
                
                { filteredSortedLocations.length > 0
                    ? <LocationsTable
                        locations={filteredSortedLocations}
                        locationSelected={loc => this.select(loc)}
                        selectedLocation={this.props.selectedLocation}
                        sortByCategory={this.state.sortByCategory}
                        toggleCategorySort={() => this.toggleCategorySort()}
                    />
                    : <h3>No locations to show</h3>
                }

                <span>Hint: Right click the map to add a location</span>
                <LocationsMap
                    onClick={() => this.onMapClick()}
                    locations={filteredSortedLocations}
                    selectedLocation={this.props.selectedLocation}
                    locationInfoClosed={() => this.deselect()}
                    ref={map => this.getMapRef(map)}
                    onRightClick={() => this.deselect()}
                    locationClicked={loc => this.selectFromMap(loc)}
                    onAdditionClick={() => this.onAddFromMap()}
                />
                <div style={{height: `70px`}}/>
            </div>
        )
    }
}