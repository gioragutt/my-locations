import React from 'react'

const locationRowClasses = (isSelected, categoryInvalid) => {
    if (isSelected) {
        return 'bg-primary';
    } else if (categoryInvalid) {
        return 'bg-danger';
    }
    return null;
}

const Row = ({location, isSelected, onClick}) => (
    <tr className={locationRowClasses(isSelected, !location.category)}
        onClick={() => onClick(location)}
    >
        <td>{location.name}</td>
        <td>{location.category}</td>
        <td>{location.address}</td>
        <td>{location.coordinates.lat}</td>
        <td>{location.coordinates.long}</td>
    </tr>
);

const LocationRows = ({locations, selectedLocation, onClick}) => locations.map(loc => (
    <Row
        key={loc.id}
        location={loc}
        isSelected={!!selectedLocation ? loc.id === selectedLocation.id : false}
        onClick={onClick}
    />
));

export default LocationRows;