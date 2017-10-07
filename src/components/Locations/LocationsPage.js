import React, { Component } from 'react';

import LocationsNavbar from './LocationsNavbar';
import LocationFormModal from './LocationFormModal';
import LocationsMap from './LocationsMap';
import LocationsTable from './LocationsTable';
import Layout from './Layout';
import CategorySortAndFilter from './CategorySortAndFilter';

import { sortAndFilterLocations, toggleSortByCategory } from './util';
import { toGoogleMapsCoordinates } from '../Map/geolocation';
import vibrate from '../../vibrate';

import './Locations.css';

export default class LocationsPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            adding: false,
            editing: false,
            sortByCategory: null
        };

        this.setAdding = adding => this.setState({adding});
        this.setEditing = editing => this.setState({editing});
    }

    openAddDialog() {
        this.deselect();
        this.setAdding(true);
    }

    closeAddDialog() {
        this.setAdding(false);
    }

    openEditDialog() {
        this.setEditing(true);
    }

    closeEditDialog() {
        this.setEditing(false);
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
        this.toggleSelect(location, loc =>
            this.map.getGM().panTo(toGoogleMapsCoordinates(loc.coordinates)));
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

    renderCategorySortAndFilter() {
        return (
            <div className="category-filter fill-navbar-space">
                <CategorySortAndFilter
                    onFilterChange={this.props.setCategoryFilter}
                    resetFilter={this.props.resetCategoryFilter}
                    filterValue={this.props.categoryFilter}
                    availableCategories={this.props.categories}
                    sortByCategory={this.state.sortByCategory}
                    toggleCategorySort={() => this.toggleCategorySort()}
                />
            </div>
        )
    }

    renderBody() {
        const filteredSortedLocations = sortAndFilterLocations(
            this.props.locations,
            this.state.sortByCategory,
            this.props.categoryFilter
        );

        const locations = (
            <LocationsTable
                locations={filteredSortedLocations}
                categoryFilter={this.props.categoryFilter}
                locationSelected={loc => this.select(loc)}
                selectedLocation={this.props.selectedLocation}
            />
        );
        
        const main = (
            <div>
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
                    onLocationRemove={() => this.removeSelectedCategory()}
                    onLocationEdit={() => this.openEditDialog()}
                />
            </div>
        );

        return (
            <Layout
                side={
                    <div>
                        {this.renderCategorySortAndFilter()}
                        <br></br>
                        {locations}
                    </div>
                }
                main = {main}
            />
        );
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
                {this.renderBody()}
            </div>
        )
    }
}