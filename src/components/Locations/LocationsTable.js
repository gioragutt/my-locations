import React, { PureComponent } from 'react'

import { Label, ListGroup, ListGroupItem } from 'react-bootstrap';

const LocationItemHeader = ({
    name,
    category
}) => (
    <div style={{display: `flex`}}>
        <b>{name}</b>
        <div style={{flex: `1`}}/>
        <div>
            {
                !!category 
                ? <Label bsStyle="info">{category}</Label>
                : <Label bsStyle="danger">Missing Category</Label>
            }
            
        </div>
    </div>
);

const LocationItem =({
    location,
    locationSelected,
    isLocationSelected,
    isCategoryInvalid
}) => (
    <ListGroupItem
        header={<LocationItemHeader name={location.name} category={location.category} />}
        className={`locations-list-item-${location.id}`}
        active={isLocationSelected}
        bsStyle={(!isLocationSelected && isCategoryInvalid) ? 'warning' : null}
        onClick={() => locationSelected(location)}
    >
        {location.address}
    </ListGroupItem>
);

const LocationsList = ({
    locations,
    selectedLocation,
    locationSelected
}) => (
    <ListGroup className="locations-list">
    {
        locations.map(loc => (
            <LocationItem
                location={loc}
                key={loc.id}
                isLocationSelected={selectedLocation && loc.id === selectedLocation.id}
                isCategoryInvalid={!loc.category}
                locationSelected={locationSelected}
            />
        ))
    }
    </ListGroup>
);

const NoLocations = ({categoryFilter}) => (
    <div>
        No locations to show
        {categoryFilter && [
            ' for ',
            <Label bsStyle="info" key="no-locations-for-category">{categoryFilter}</Label>
        ]}
    </div>
);

export default class LocationsTable extends PureComponent {

    scrollToItem(id) {
        const node = document.querySelector(`.locations-list-item-${id}`);
        node.scrollIntoView({
            block: 'nearest'
        });
    }

    componentWillReceiveProps(nextProps) {
        const next = nextProps.selectedLocation;
        if (!next) {
            return;
        }

        this.scrollToItem(next.id);
    }

    render() {
        const {
            locations,
            categoryFilter,
            selectedLocation,
            locationSelected
        } = this.props;

        if (locations.length === 0) {
            return <NoLocations categoryFilter={categoryFilter} />;
        }
    
        return (
            <LocationsList
                locations={locations}
                selectedLocation={selectedLocation}
                locationSelected={locationSelected}
            />
        );
    }
}